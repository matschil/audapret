import { baseUrl } from "./config";
export const workflowRoute = `${baseUrl}/api/cron/workflow`;
export const redirectUri = `${baseUrl}/api/fitbit/callback`;
export enum FitbitPath {
  ACTIVITIES = "activities",
  SLEEP = "sleep",
  /* activities/caloriesBMR
activities/steps
activities/distance
activities/floors
activities/elevation
activities/minutesSedentary
activities/minutesLightlyActive
activities/minutesFairlyActive
activities/minutesVeryActive
activities/activityCalories
 */
}
export class AxiosOauth2Response {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}
