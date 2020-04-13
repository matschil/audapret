import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  InitializationPayloadDto,
  studyDataManagerPort
} from '@audapret/shared';
import { environment } from '../../environments/environment';
@Injectable()
export class InitializationService {
  constructor(private readonly httpClient: HttpClient) {}

  postInitialization(initializationPayload: InitializationPayloadDto) {
    console.log(
      'environment.STUDY_DATA_MANAGER_ADDRESS = ' +
        environment.STUDY_DATA_MANAGER_ADDRESS
    );

    return this.httpClient.post(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}` +
        '/api/initialization',
      initializationPayload
    );
  }
}
