import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable()
export class SendFormDataService {
  constructor(private readonly httpClient: HttpClient) {}

  sendData(username: string) {
    console.log("was here");
    return new Promise(() => true);
  }
}
/* return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyDataPath}`,
      {
        params: { username: username },
      }
    ); */
