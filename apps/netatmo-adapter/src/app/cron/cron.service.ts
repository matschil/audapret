// Perform OAuth2 authentification with oura cloud
import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {
  studyDataManagerAdapterDataPath,
  AdapterPayloadDto,
  studyDataManagerPort
} from '@audapret/shared';
import { netatmoUrl } from '../../assets/config';

@Injectable()
export class CronService {
  constructor(private readonly httpService: HttpService) {
    this.address = `${process.env.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`;
    this.netatmoUrl = new URL(netatmoUrl);
  }
  private address: string;
  private netatmoUrl: URL;

  /**
   * Attention: At implementation time there was no data available at the Netatmo account of the specified credentials.
   * To show that the Adapter can be used, the user information of the Netatmo account gets retrieved from the cloud.
   * Status 27.01.2020: The route /getuser is deprecated and no longer supported. However it can still be called and returns a valid payload.
   * As /getuser is the only route that can be called without a device_id, it is the only route that can be called in the scope of the prototype
   */
  async fetchData(accessToken: string) {
    this.netatmoUrl.pathname = '/api/getuser';
    return await this.httpService
      .get(this.netatmoUrl.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: 'application/json'
        }
      })
      .toPromise();
  }

  // Send adapterDataPayload to studyDataManager
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
