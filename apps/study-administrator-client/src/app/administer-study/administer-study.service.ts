import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  studyAdministratorPort,
  studyAdministratorStudyPath
} from '../../assets/config';
import { StudyDto } from '@audapret/administrator';
import { environment } from '../../environments/environment';

@Injectable()
export class AdministerStudyService {
  constructor(private readonly httpClient: HttpClient) {}

  createStudy(studyDto: StudyDto) {
    return this.httpClient.post(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`,
      studyDto
    );
  }
  getStudies() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`
    );
  }
}
