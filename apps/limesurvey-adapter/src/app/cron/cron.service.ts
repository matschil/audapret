import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lsmethods } from '../../assets/shared';
import { limesurveyConfig } from '../../assets/config';
import { AdapterPayloadDto, studyDataManagerPort } from '@audapret/shared';
import { studyDataManagerAdapterDataPath } from '@audapret/shared';

@Injectable()
export class CronService {
  constructor(private readonly httpService: HttpService) {
    this.address = `${process.env.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`;
  }
  private address: string;

  /** Fetch all surveys that are covered by @param sessionKey from the Limesurvey API */
  async getSurveys(sessionKey: string) {
    return this.httpService
      .post(
        limesurveyConfig.url,
        {
          method: lsmethods.LIST_SURVEYS,
          params: [sessionKey],
          id: 1
        },
        limesurveyConfig
      )
      .toPromise();
  }

  /** Fetch all responses that are for the study specified by @param sid from the limesurvey API */
  async fetchData(sessionKey: string, sid: string) {
    return this.httpService
      .post(
        limesurveyConfig.url,
        {
          method: lsmethods.EXPORT_RESPONSES,
          params: [sessionKey, sid, 'json'],
          id: 1
        },
        limesurveyConfig
      )
      .toPromise();
  }

  /** Send adapterDataPayload to StudyDataManager */
  async sendData(
    adapterPayload: AdapterPayloadDto
  ): Promise<AxiosResponse<any>> {
    try {
      return this.httpService
        .post(this.address, adapterPayload, {
          headers: { requester: 'adapter' }
        })
        .toPromise();
    } catch (error) {
      console.error(error.message);
    }
  }
}
