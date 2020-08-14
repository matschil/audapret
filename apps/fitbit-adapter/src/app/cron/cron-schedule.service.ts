import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CronService } from "./cron.service";
import { DatabaseService } from "../database/database.service";
import { triggerInterval, StudyBeginDate } from "../../assets/config";
import { FitbitPath } from "../../assets/shared";
import { OuraAuthService } from "../auth/auth.service";
import { AdapterAuthEntity } from "../entity/adapter-auth.entity";

@Injectable()
export class CronScheduleService {
  constructor(
    private readonly cronService: CronService,
    private readonly authService: OuraAuthService,
    private readonly databaseService: DatabaseService
  ) {}
  initialAdapterData: boolean;

  @Cron(triggerInterval)
  async handleCron() {
    let accessToken: string;
    console.log("triggered");
    // (1) Authentification workflow
    try {
      const latestAuthEntity = await this.databaseService.getLatestAuthEntity();
      if (latestAuthEntity === undefined) {
        throw new Error(
          "Please manually perform first authentication at the Fitbit Cloud by opening `localhost:3339/api/fitbit` in your browser"
        );
      } else {
        const expiration_date =
          latestAuthEntity.updatedAt.valueOf() +
          latestAuthEntity.expires_in * 100;
        if (expiration_date > Date.now()) {
          // Refresh token
          const token = await this.authService.refreshAccessToken(
            latestAuthEntity.refresh_token
          );
          const updatedAuthEntity: AdapterAuthEntity = {
            refresh_token: token.refresh_token,
            access_token: token.access_token,
            id: latestAuthEntity.id,
            expires_in: token.expires_in,
          };

          accessToken = (
            await this.databaseService.saveAdapterAuthEntity(updatedAuthEntity)
          ).access_token;
        } else {
          // access_token is not valid anymore and has to be obtained again
          throw new Error(
            "Please manually perform new authentication at the Fitbit Cloud by opening `localhost:3339/api/fitbit` in your browser"
          );
        }
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }

    // (2) Data processing workflow
    for (const path of [FitbitPath.SLEEP]) {
      // (2.1) Get date of latest successful retrival of data of current category from fitbit cloud
      let metaEntity = await this.databaseService.getMetaDataEntity(path);
      if (metaEntity === undefined) {
        // This adapter has never sent data
        // (2.1.1) Create new MetaEntity with begin date of study
        metaEntity = this.databaseService.createMetaDataEntity({
          path,
          lastSuccessfulRetrieval: StudyBeginDate,
        });
      }

      // (2.2) get date of format YYYY-MM-DD
      const latestRetrievalDate = metaEntity.lastSuccessfulRetrieval
        .toISOString()
        .slice(0, 10);

      const newRetrievalDate = new Date(
        metaEntity.lastSuccessfulRetrieval.setDate(
          metaEntity.lastSuccessfulRetrieval.getDate() + 5
        )
      )
        .toISOString()
        .slice(0, 10);
      let fitbitData: any;

      try {
        // (2.3) Fetch data that was between today and the latestRetrivalDate

        fitbitData = await this.cronService.fetchData(
          path,
          accessToken,
          latestRetrievalDate,
          newRetrievalDate
        );
        fitbitData = fitbitData.data;

        if (
          fitbitData[path.toString()].length === 0 ||
          new Date().toISOString().slice(0, 10) <= newRetrievalDate
        ) {
          // No new data is available at the Fitbit API.
          // Do not send empty data - skip current iteration
          continue;
        }
      } catch (error) {
        console.error(
          `Error while fetching data for ${path}: ${error.message}`
        );
      }
      try {
        // (2.4) Send data to StudyDataManager
        const responses = await this.cronService.sendData(fitbitData);
        // Very sketchy -> this only checks whether the last request has been successful
        if (responses[responses.length - 1].status === 201) {
          // (2.5) Update metaEntity to latest retrieval data
          metaEntity.lastSuccessfulRetrieval = new Date();
          await this.databaseService.saveMetaDataEntity(metaEntity);
        }
      } catch (error) {
        console.error(
          `Error while sending ${path} data to studyDataManager: ${error.message}`
        );
      }
    }
  }
}
