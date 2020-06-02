import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  CreateGrantPayloadDto,
  UserDto,
  UpdateGrantPayloadDto,
} from "@audapret/shared";
import { studyDataManagerGrantPath } from "../../assets/config";
import { studyDataManagerPort } from "@audapret/shared";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { filter, map, first } from "rxjs/operators";

@Injectable()
export class GrantService {
  constructor(private readonly httpClient: HttpClient) {}

  postGrant(createGrantPayload: CreateGrantPayloadDto) {
    console.log(createGrantPayload);
    return this.httpClient.post(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerGrantPath}`,
      createGrantPayload
    );
  }
  putGrant(updateGrantPayload: UpdateGrantPayloadDto) {
    return this.httpClient.put(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerGrantPath}`,
      updateGrantPayload
    );
  }
  getUsers(): Observable<UserDto[]> {
    return this.httpClient.get(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerGrantPath}`
    ) as Observable<UserDto[]>;
  }
  getUser(username: string): Observable<UserDto> {
    return this.getUsers().pipe(
      first(),
      map((users) => users.find((user) => user.username))
    );
  }
}
