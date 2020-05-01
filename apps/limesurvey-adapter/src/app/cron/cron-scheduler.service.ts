import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { AdapterPayloadDto } from "@audapret/shared";
import { CronService } from "./cron.service";
import { AuthService } from "../auth/auth.service";
import { DatabaseService } from "../database/database.service";
import { triggerInterval } from "../../assets/config";

@Injectable()
export class TasksService {
  constructor(
    private readonly cronService: CronService,
    private readonly authService: AuthService,
    private readonly databaseService: DatabaseService
  ) {}

  @Cron(triggerInterval)
  async handleCron() {
    try {
      // (1) Authenticate at Limesurvey API -> request session key
      const sessionKey = (await this.authService.getSessionKey()).data.result;

      // (2) Get all surveys available for the session
      const surveyProperties = await this.cronService.getSurveys(sessionKey);

      for (const survey of surveyProperties.data.result) {
        // (3) Collect data from Limesurvey API
        const responsesCsv = await this.cronService.fetchData(
          sessionKey,
          survey.sid
        );

        // (3.1) If no data exists, skip this survey
        if (responsesCsv.data.result.status !== undefined) {
          continue;
        }

        // (4) Decode the base64 string of the survey results
        const responses: Array<any> = JSON.parse(
          Buffer.from(responsesCsv.data.result, "base64").toString("binary")
        ).responses;

        // (5) get metaEntity for latest retrieval
        let metaEntity = await this.databaseService.getMetaDataEntity(
          survey.sid
        );

        if (metaEntity === undefined) {
          // first time that data for this survey is retrieved
          // (5.1) Insert new MetaEntity with smallest possible id
          metaEntity = this.databaseService.createMetaDataEntity({
            lastRetrievedResponseId: 0,
            surveyId: survey.sid,
          });
        }

        // (6) Extract responses that were not yet sent to the StudyDataManager
        const newResponses = responses.filter((response) => {
          return (
            parseInt(response[Object.keys(response)[0]].id) >
            metaEntity.lastRetrievedResponseId
          );
        });

        if (newResponses.length) {
          // If there are any new responses
          // (7) Process data to AdapterpayloadDto
          const adapterPayload: AdapterPayloadDto = {
            content: JSON.stringify(newResponses),
            description: survey.surveyls_title,
            source: survey.surveyls_title,
          };

          // (8) Send data to StudyDataManager
          const res = await this.cronService.sendData(adapterPayload);

          if (res.status === 201) {
            // (9) Update MetaEntity
            const lastRetrievedResponse = responses.pop();
            const latestRetrievedResponseId = parseInt(
              lastRetrievedResponse[Object.keys(lastRetrievedResponse)[0]].id
            );
            metaEntity.lastRetrievedResponseId = latestRetrievedResponseId;
            await this.databaseService.saveMetaDataEntity(metaEntity);
          }
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}
