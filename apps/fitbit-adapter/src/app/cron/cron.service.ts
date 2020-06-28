import { Injectable, HttpService } from "@nestjs/common";
import { studyDataManagerAdapterDataPath } from "@audapret/shared";
import { AdapterPayloadDto, studyDataManagerPort } from "@audapret/shared";
import { FitbitPath } from "../../assets/shared";
import { AxiosResponse } from "axios";
import { fitbitUri, userId } from "../../assets/config";
import "url";

@Injectable()
export class CronService {
  constructor(private readonly httpService: HttpService) {
    this.address = `${process.env.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`;
    this.fitbitUri = new URL(fitbitUri);
  }
  private address: string;
  private fitbitUri: URL;

  async sendData(data: any): Promise<AxiosResponse<any>[]> {
    const responses = [];
    for (const key of Object.keys(data)) {
      for (const content of data[key]) {
        try {
          const payload: AdapterPayloadDto = {
            source: `fitbit/${key}`,
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
    path: /* FitbitPath.ACTIVITIES | */ FitbitPath.SLEEP,
    token: string,
    start?: string,
    end?: string
  ): Promise<AxiosResponse<any>> {
    // Build path to fetch data from
    this.fitbitUri.pathname = `/1/user/${userId}/${path}/date`;
    this.fitbitUri.searchParams.append("access_token", token);
    if (start) {
      this.fitbitUri.pathname += `/${start}`;
      //this.fitbitUri.pathname += `/2020-03-21`;
      if (end) {
        this.fitbitUri.pathname += `/${end}`;
      }
    } else {
      this.fitbitUri.pathname += `/today`;
    }
    this.fitbitUri.pathname += `.json`;

    // Build authorization request header
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await this.httpService
      .get(this.fitbitUri.href, { headers })
      .toPromise();
    return response;
  }
}
