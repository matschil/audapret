import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AdapterPayloadDto } from "@audapret/shared";
import { CronService } from "./cron.service";
import { AuthService } from "../auth/auth.service";
import { DatabaseService } from "../database/database.service";
import { triggerInterval } from "../../assets/config";

@Injectable()
export class CronScheduleService {
  constructor(
    private readonly cronService: CronService,
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService
  ) {}
  initialAdapterData: boolean;

  @Cron(triggerInterval)
  async handleCron() {
    console.log("triggered");
    this.initialAdapterData = false;
    try {
      // (1) Authenticate at Netatmo API
      const token = await this.authService.getAccessToken();

      // (2) Data processing workflow
      // (2.1) Fetch data from Netatmo API
      const netatmoData = (await this.cronService.fetchData(token)).data.body;

      // (2.2) Load latest MetaDataEntity from database
      let metaEntity = await this.databaseService.getMetaDataEntity();
      if (metaEntity === undefined) {
        // This adapter has never sent data

        // (2.2.1) Create new MetaEntity
        metaEntity = this.databaseService.createMetaDataEntity({
          lastRetreivedUserDataId: netatmoData._id,
        });

        // (2.2.2) Remember that this is the first AdapterDataDto from the NetatmoAdapter
        this.initialAdapterData = true;
      }

      // (2.3) Check whether the fetched data has already been sent to the StudyDataManager
      if (
        metaEntity.lastRetreivedUserDataId !== netatmoData._id ||
        this.initialAdapterData
      ) {
        // (2.4) Build adapterPayload
        const adapterPayload: AdapterPayloadDto = {
          content: JSON.stringify(netatmoData),
          description: "netatmo_data",
          source: "netatmo_API",
        };

        // (2.5) Send data to StudyDataManager
        const res = await this.cronService.sendData(adapterPayload);

        if (res.status === 201) {
          // (2.6) Update metaDataEntity
          metaEntity.lastRetreivedUserDataId = netatmoData._id;
          await this.databaseService.saveMetaDataEntity(metaEntity);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
