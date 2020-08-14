import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserDto, studyDataManagerPort } from "@audapret/shared";
import { environment } from "../../environments/environment";
@Injectable()
export class InitializationService {
  constructor(private readonly httpClient: HttpClient) {}

  initializeServer(userDto: UserDto) {
    return this.httpClient.post(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}` +
        "/api/initialization",
      userDto
    );
  }
}
