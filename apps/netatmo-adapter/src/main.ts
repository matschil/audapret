import { NestFactory } from '@nestjs/core';
import * as cron from 'node-cron';
import { AppModule } from './app/app.module';
import { HttpService } from '@nestjs/common';
import { triggerInterval } from './assets/config';
import * as inspector from 'inspector';

async function bootstrap() {
  // Reopen inspector on uniquely used port
  inspector.close();
  inspector.open(7782);

  // Set environment variables
  if (!process.env.STUDY_DATA_MANAGER_ADDRESS) {
    process.env.STUDY_DATA_MANAGER_ADDRESS = 'http://localhost';
  }
  if (!process.env.NETATMO_ADAPTER_DB) {
    process.env.NETATMO_ADAPTER_DB = 'localhost';
  }
  if (!process.env.NETATMO_ADAPTER_ADDRESS) {
    process.env.NETATMO_ADAPTER_ADDRESS = 'http://localhost';
  }

  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3339;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });

  //start cronjob to trigger adapterWorkFlow
  const httpService = new HttpService();
  cron.schedule(triggerInterval, async () => {
    console.log('triggered');
    await httpService
      .get('http://localhost:' + port + '/api/cron/workflow')
      .toPromise();
  });
}

bootstrap();
