import { Injectable, HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lsmethods } from '../../assets/shared';
import { credentials, limesurveyConfig } from '../../assets/config';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * @returns valid session key for the limesurvey API
   */
  async getSessionKey(): Promise<AxiosResponse> {
    return await this.httpService
      .post(
        limesurveyConfig.url,
        {
          method: lsmethods.GET_SESSION_KEY,
          params: [credentials.username, credentials.password],
          id: 1
        },
        limesurveyConfig
      )
      .toPromise();
  }
}
