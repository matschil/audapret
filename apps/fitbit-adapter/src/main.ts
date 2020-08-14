import { NestFactory } from "@nestjs/core";
import * as cron from "node-cron";
import { AppModule } from "./app/app.module";
import * as inspector from "inspector";
import "@audapret/shared";
import { HttpService } from "@nestjs/common";
import { workflowRoute } from "./assets/shared";
import { triggerInterval } from "./assets/config";

async function bootstrap() {
  // Reopen inspector on uniquely used port
  inspector.close();
  inspector.open(7783);

  // Set environment variables
  if (!process.env.STUDY_DATA_MANAGER_ADDRESS) {
    process.env.STUDY_DATA_MANAGER_ADDRESS = "http://localhost";
  }
  if (!process.env.FITBIT_ADAPTER_DB) {
    process.env.FITBIT_ADAPTER_DB = "";
  }
  if (!process.env.FITBIT_ADAPTER_ADDRESS) {
    process.env.FITBIT_ADAPTER_ADDRESS = "http://localhost/";
  }

  const app = await NestFactory.create(AppModule);
  const httpService = new HttpService();

  const globalPrefix = "api";
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.port || 3339;
  await app.listen(port, () => {
    console.log(
      "Listening at " +
        process.env.FITBIT_ADAPTER_ADDRESS +
        +port +
        "/" +
        globalPrefix
    );
  });
}

bootstrap();
