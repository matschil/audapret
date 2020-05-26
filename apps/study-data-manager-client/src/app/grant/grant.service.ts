import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  GrantPayloadDto,
  CreateGrantPayloadDto,
  UserDto,
} from "@audapret/shared";
import { owner, studyDataManagerGrantPath } from "../../assets/config";
import { studyDataManagerPort } from "@audapret/shared";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { userInfo } from "os";
import { copyFileSync } from "fs";
import { Observable } from "rxjs";

@Injectable()
export class GrantService {
  constructor(private readonly httpClient: HttpClient) {}

  postGrant(createGrantPayload: CreateGrantPayloadDto) {
    return this.httpClient.post(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerGrantPath}`,
      createGrantPayload
    );
  }
  getUsers(): Observable<UserDto[]> {
    return this.httpClient.get(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerGrantPath}`
    ) as Observable<UserDto[]>;
  }
}
