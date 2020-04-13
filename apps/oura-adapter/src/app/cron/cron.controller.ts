import { Controller, Get } from '@nestjs/common';
import { OuraAuthService } from '../auth/auth.service';
import { CronService } from './cron.service';
import { DatabaseService } from '../database/database.service';
import { OuraCategory } from '../../assets/shared';
import { StudyBeginDate } from '../../assets/config';

@Controller('cron')
export class CronController {
  constructor(
    private readonly authService: OuraAuthService,
    private readonly cronService: CronService,
    private readonly databaseService: DatabaseService
  ) {}

  @Get('workflow')
  async workflow() {
    let accessToken: string;
    // (1) Authentification workflow
    try {
      const latestAuthEntity = await this.databaseService.getLatestAuthEntity();
      if (latestAuthEntity === undefined) {
        throw new Error(
          'Please manually perform first authentication at the Oura Cloud by opening `localhost:3334/api/oura` in your browser'
        );
      } else {
        const expiration_date =
          latestAuthEntity.updatedAt.valueOf() +
          latestAuthEntity.expires_in * 100;
        if (expiration_date > Date.now()) {
          // Refresh token
          const refreshedToken = await this.authService.refreshAccessToken(
            latestAuthEntity.refresh_token
          );
          refreshedToken.id = latestAuthEntity.id;
          accessToken = (await this.databaseService.saveAdapterAuthEntity(
            refreshedToken
          )).access_token;
        } else {
          // access_token is not valid anymore and has to be obtained again
          throw new Error(
            'Please manually perform new authentication at the Oura Cloud by opening `localhost:3334/api/oura` in your browser'
          );
        }
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }

    // (2) Data processing workflow
    for (const category of Object.values(OuraCategory)) {
      // (2.1) Get date of latest successful retrival of data of current category from oura cloud
      let metaEntity = await this.databaseService.getMetaDataEntity(category);
      if (metaEntity === undefined) {
        // This adapter has never sent data
        // (2.1.1) Create new MetaEntity with begin date of study
        metaEntity = this.databaseService.createMetaDataEntity({
          category: category,
          lastSuccessfulRetrieval: StudyBeginDate
        });
      }

      // (2.2) get date of format YYYY-MM-DD
      const latestRetrievalDate = metaEntity.lastSuccessfulRetrieval
        .toISOString()
        .slice(0, 10);
      let ouraData: any;

      try {
        // (2.3) Fetch data that was between today and the latestRetrivalDate

        ouraData = (await this.cronService.fetchData(
          category,
          accessToken,
          latestRetrievalDate
        )).data;
        if (
          ouraData[category.toString()].length === 0 ||
          new Date().toISOString().slice(0, 10) === latestRetrievalDate
        ) {
          // No new data is available at the Oura API.
          // Do not send empty data - skip current iteration
          continue;
        }
      } catch (error) {
        console.error(
          `Error while fetching data for ${category}: ${error.message}`
        );
      }
      try {
        // (2.4) Send data to StudyDataManager
        const res = await this.cronService.sendData(ouraData);
        if (res.status === 201) {
          // (2.5) Update metaEntity to latest retrieval data
          metaEntity.lastSuccessfulRetrieval = new Date();
          await this.databaseService.saveMetaDataEntity(metaEntity);
        }
      } catch (error) {
        console.error(
          `Error while sending ${category} data to studyDataManager: ${error.message}`
        );
      }
    }
  }
}
