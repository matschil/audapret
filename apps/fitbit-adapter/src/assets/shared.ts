import { baseUrl } from "./config";
export const workflowRoute = `${baseUrl}/api/cron/workflow`;
export const redirectUri = `${baseUrl}/api/fitbit/callback`;
export enum FitbitPath {
  SLEEP = "sleep",
}
export class AxiosOauth2Response {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}
