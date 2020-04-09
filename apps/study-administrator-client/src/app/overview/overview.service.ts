import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  studyAdministratorPort,
  studyAdministratorStudyPath
} from '../../assets/config';
import { environment } from '../../environments/environment';

@Injectable()
export class OverviewService {
  constructor(private readonly httpClient: HttpClient) {}

  getStudies() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`
    );
  }
}
