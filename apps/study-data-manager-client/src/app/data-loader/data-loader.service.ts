import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { owner, studyDataManagerDataSourcePath } from "../../assets/config";
import {
  studyDataManagerPort,
  studyDataManagerAdapterDataPath,
} from "@audapret/shared";
import { environment } from "../../environments/environment";

@Injectable()
export class DataLoaderService {
  constructor(private readonly httpClient: HttpClient) {}

  fetchData(source: string) {
    return this.httpClient.get(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`,
      {
        params: { source: source },
        headers: { requester: owner },
      }
    );
  }

  fetchDataSources() {
    return this.httpClient.get(
      `${environment.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerDataSourcePath}`,
      {
        headers: { requester: owner },
      }
    );
  }
}
