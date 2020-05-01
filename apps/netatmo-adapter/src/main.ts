import { NestFactory } from "@nestjs/core";
import * as cron from "node-cron";
import { AppModule } from "./app/app.module";
import { HttpService } from "@nestjs/common";
import { triggerInterval } from "./assets/config";
import * as inspector from "inspector";

async function bootstrap() {
  // Reopen inspector on uniquely used port
  inspector.close();
  inspector.open(7782);

  // Set environment variables
  if (!process.env.STUDY_DATA_MANAGER_ADDRESS) {
    process.env.STUDY_DATA_MANAGER_ADDRESS = "http://localhost";
  }
  if (!process.env.NETATMO_ADAPTER_DB) {
    process.env.NETATMO_ADAPTER_DB = ""; //'audapret-db.cbza68dntfrf.eu-central-1.rds.amazonaws.com';
  }
  if (!process.env.NETATMO_ADAPTER_ADDRESS) {
    process.env.NETATMO_ADAPTER_ADDRESS = "http://localhost";
  }

  const app = await NestFactory.create(AppModule);
  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3339;
  await app.listen(port, () => {
    console.log("Listening at http://localhost:" + port + "/" + globalPrefix);
  });
}

bootstrap();
