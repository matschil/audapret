import { AxiosRequestConfig } from 'axios';

export const limesurveyConfig: AxiosRequestConfig = {
  url: 'https://ga48roy.limequery.com/index.php/admin/remotecontrol',
  method: 'POST',
  headers: {
    host: 'ga48roy.limequery.com',
    path: '/index.php/admin/remotecontrol',
    connection: 'keep-alive',
    'content-type': 'application/json'
  }
};

export const credentials = {
  username: 'ga48roy',
  password: 'adapwear'
};

export const triggerInterval = '*/4 * * * * *';
export const dropSchemaAtEveryStart = true;
