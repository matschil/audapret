import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { studyDataManagerPort } from '@audapret/shared';
import * as inspector from 'inspector';
import * as morgan from 'morgan';
import '@audapret/shared';

async function bootstrap() {
  // Reopen inspector on uniquely used port
  inspector.close();
  inspector.open(7778);

  if (!process.env.STUDY_DATA_MANAGER_DB) {
    process.env.STUDY_DATA_MANAGER_DB = 'audapret-db.cbza68dntfrf.eu-central-1.rds.amazonaws.com';
  }

  if (!process.env.STUDY_DATA_MANAGER_ADDRESS) {
    process.env.STUDY_DATA_MANAGER_ADDRESS = ''//'http://localhost';
  }
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || studyDataManagerPort;
  app.use(morgan('tiny'));
  app.enableCors();
  await app.listen(port, () => {
    console.log(
      `Listening at ${process.env.STUDY_DATA_MANAGER_ADDRESS}:${port} ${globalPrefix}`
    );
  });
}

bootstrap();
