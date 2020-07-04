import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  studyAdministratorPort,
  studyAdministratorStudyPath,
  studyAdministratorStudyDataForUserPath,
  studyAdministratorStudyDataForSourcePath,
  studyAdministratorAllStudyDataPath,
  studyAdministratorStudyDataSourcesPath,
} from "../../assets/config";
import { environment } from "../../environments/environment";

@Injectable()
export class RequestStudyDataService {
  constructor(private readonly httpClient: HttpClient) {}

  getDataOfSource(username: string, dataSource: string) {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyDataForSourcePath}`,
      {
        params: { username, dataSource },
      }
    );
  }

  getDataSources(username: string) {
    console.log(username);
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyDataSourcesPath}`,
      {
        params: { username: username },
      }
    );
  }

  getDataForAllUsers() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorAllStudyDataPath}`
    );
  }

  getAllDataForOneUser(username: string) {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyDataForUserPath}`,
      {
        params: { username },
      }
    );
  }
  getStudies() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`
    );
  }
}
