import { Module, HttpModule } from "@nestjs/common";
import { CronModule } from "./cron/cron.module";
import { MetaDataEntity } from "./entity/meta.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dropSchemaAtEveryStart } from "../assets/config";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "./cron/cron-scheduler.service";

@Module({
  imports: [
    HttpModule,
    CronModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: "limesurvey-adapter",
        type: "postgres",
        host: `${process.env.LIMESURVEY_ADAPTER_DB}`,
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "limesurvey_adapter",
        entities: [MetaDataEntity],
        synchronize: true,
        dropSchema: dropSchemaAtEveryStart,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
