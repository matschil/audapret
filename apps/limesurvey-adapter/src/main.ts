import { NestFactory } from "@nestjs/core";
import * as cron from "node-cron";
import { AppModule } from "./app/app.module";
import * as inspector from "inspector";
import "@audapret/shared";
import { HttpService } from "@nestjs/common";
import { triggerInterval } from "./assets/config";

async function bootstrap() {
  // Reopen inspector on uniquely used port
  inspector.close();
  inspector.open(7780);

  // Set environment variables
  if (!process.env.STUDY_DATA_MANAGER_ADDRESS) {
    process.env.STUDY_DATA_MANAGER_ADDRESS = "http://localhost";
  }
  if (!process.env.LIMESURVEY_ADAPTER_DB) {
    process.env.LIMESURVEY_ADAPTER_DB = "";
  }
  if (!process.env.LIMESURVEY_ADAPTER_ADDRESS) {
    process.env.LIMESURVEY_ADAPTER_ADDRESS = "http://localhost";
  }

  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3335;
  await app.listen(port, () => {
    console.log(process.env.LIMESURVEY_ADAPTER + port + "/" + globalPrefix);
  });
}

bootstrap();
