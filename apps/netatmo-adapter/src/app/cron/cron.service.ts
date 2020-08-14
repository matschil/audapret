// Perform OAuth2 authentification with oura cloud
import { Injectable, HttpService } from "@nestjs/common";
import { AxiosResponse } from "axios";
import {
  studyDataManagerAdapterDataPath,
  AdapterPayloadDto,
  studyDataManagerPort,
} from "@audapret/shared";
import { netatmoUrl, netatmoIndoorDeviceId } from "../../assets/config";

@Injectable()
export class CronService {
  constructor(private readonly httpService: HttpService) {
    this.address = `${process.env.STUDY_DATA_MANAGER_ADDRESS}:${studyDataManagerPort}${studyDataManagerAdapterDataPath}`;
    this.netatmoUrl = new URL(netatmoUrl);
  }
  private address: string;
  private netatmoUrl: URL;

  resetUrl() {
    this.netatmoUrl.pathname = "/api/getmeasure";

    // Remove exesting parameters from url
    this.netatmoUrl.searchParams.forEach((param) =>
      this.netatmoUrl.searchParams.delete(param)
    );

    // Append required parameters
    this.netatmoUrl.searchParams.append("device_id", netatmoIndoorDeviceId);
    this.netatmoUrl.searchParams.append("scale", "3hours");
    this.netatmoUrl.searchParams.append("type", "temperature");
  }
  async fetchData(accessToken: string) {
    this.resetUrl();
    const response = await this.httpService
      .get(this.netatmoUrl.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      })
      .toPromise();
    return response;
  }

  // Send adapterDataPayload to studyDataManager
  async sendData(
    adapterPayload: AdapterPayloadDto
  ): Promise<AxiosResponse<any>> {
    try {
      return this.httpService
        .post(this.address, adapterPayload, {
          headers: { requester: "adapter" },
        })
        .toPromise();
    } catch (error) {
      console.error(error.message);
    }
  }

  getLatestMeasurementDate(netatmoData: [{ beg_time: number }]) {
    const measureTimes = netatmoData.map((data) => data.beg_time) as number[];
    return measureTimes.sort((a, b) => b - a).pop();
  }
}
