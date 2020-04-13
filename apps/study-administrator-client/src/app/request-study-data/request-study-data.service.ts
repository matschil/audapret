import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  studyAdministratorPort,
  studyAdministratorStudyPath,
  studyAdministratorStudyDataPath,
  studyAdministratorAllStudyDataPath
} from '../../assets/config';
import { environment } from '../../environments/environment';

@Injectable()
export class RequestStudyDataService {
  constructor(private readonly httpClient: HttpClient) {}

  getData(username: string) {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyDataPath}`,
      {
        params: { username: username }
      }
    );
  }

  getDataForAllUsers() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorAllStudyDataPath}`
    );
  }

  getStudies() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`
    );
  }
}
