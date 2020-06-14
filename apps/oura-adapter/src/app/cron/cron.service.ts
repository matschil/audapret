import { Injectable, HttpService } from "@nestjs/common";
import { studyDataManagerAdapterDataPath } from "@audapret/shared";
import { AdapterPayloadDto, studyDataManagerPort } from "@audapret/shared";
import { OuraCategory } from "../../assets/shared";
import { AxiosResponse } from "axios";
import { ouraUri } from "../../assets/config";
import "url";

@Injectable()
export class CronService {
  constructor(private readonly httpService: HttpService) {
    this.address = `${process.env.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`;
    this.ouraUri = new URL(ouraUri);
  }
  private address: string;
  private ouraUri: URL;

  async sendData(data: any): Promise<AxiosResponse<any>[]> {
    let responses = [];
    for (const key of Object.keys(data)) {
      for (const content of data[key]) {
        try {
          let payload: AdapterPayloadDto = {
            source: `oura/${key}`,
            description: key,
            content: JSON.stringify(content),
          };
          // Validate request payload
          let response = await this.httpService
            .post(this.address, payload, { headers: { requester: "adapter" } })
            .toPromise();
          responses.push(response);
          // Currently intentionally stop iteration here to restrict the payload size
          //return res;
        } catch (error) {
          console.error(error.message);
        }
      }
    }
    return responses;
  }

  /** Fetch all data of @param category that was measured between @param start and @param end */
  async fetchData(
    category:
      | OuraCategory.SLEEP
      | OuraCategory.ACTIVITY
      | OuraCategory.READINESS,
    token: string,
    start?: string,
    end?: string
  ): Promise<AxiosResponse<any>> {
    this.ouraUri.pathname = `/v1/${category}`;
    this.ouraUri.searchParams.append("access_token", token);
    if (start) {
      this.ouraUri.searchParams.append("start", start);
    }
    if (end) {
      this.ouraUri.searchParams.append("end", end);
    }

    return this.httpService.get(this.ouraUri.href).toPromise();
  }
}
