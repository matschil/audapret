import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GrantPayloadDto } from '@audapret/shared';
import { owner, studyDataManagerGrantPath } from '../../assets/config';
import { studyDataManagerPort } from '@audapret/shared';
import { environment } from '../../environments/environment';

@Injectable()
export class GrantService {
  constructor(private readonly httpClient: HttpClient) {}

  postGrants(grantPayload: GrantPayloadDto) {
    // Requester: Felix currently hardcoded as Felix is the owner of the respective studyDataManager

    return this.httpClient.post(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerGrantPath}`,
      grantPayload,
      {
        headers: { requester: owner }
      }
    );
  }
}
