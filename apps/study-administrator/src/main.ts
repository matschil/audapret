import { NestFactory } from '@nestjs/core';
import * as inspector from 'inspector';
import { AppModule } from './app/app.module';

async function bootstrap() {
  inspector.close();
  inspector.open(7781);

  if (!process.env.STUDY_ADMINISTRATOR_DB) {
    process.env.STUDY_ADMINISTRATOR_DB = 'localhost';
  }
  if (!process.env.STUDY_ADMINISTRATOR_ADDRESS) {
    process.env.STUDY_ADMINISTRATOR_ADDRESS = 'http://localhost';
  }
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3336;
  app.enableCors();

  await app.listen(port, () => {
    console.log(
      `Listening at ${process.env.STUDY_ADMINISTRATOR_ADDRESS}:${port}/${globalPrefix}`
    );
  });
}

bootstrap();
