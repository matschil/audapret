import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {
  studyDataManagerPort,
  studyDataManagerAdapterDataPath,
  AdapterPayloadDto,
} from "@audapret/shared";
import { Observable } from "rxjs";

@Injectable()
export class SendFormDataService {
  constructor(private readonly httpClient: HttpClient) {}

  sendData(data: any, formName: string): Observable<Object> {
    const payload: AdapterPayloadDto = {
      source: `qsform/${formName}`,
      description: formName,
      content: JSON.stringify(data),
    };

    return this.httpClient.post(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`,
      payload,
      { headers: { requester: "adapter" } }
    );
  }
}
