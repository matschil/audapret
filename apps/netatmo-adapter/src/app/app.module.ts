import { Module, HttpModule } from "@nestjs/common";
import { CronModule } from "./cron/cron.module";
import { DatabaseModule } from "./database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NetatmoMetaDataEntity } from "./entity/meta.entity";
import { dropSchemaAtEveryStart } from "../assets/config";

@Module({
  imports: [
    HttpModule,
    CronModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: "netatmo-adapter",
        type: "postgres",
        host: `${process.env.NETATMO_ADAPTER_DB}`,
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "netatmo_adapter",
        entities: [NetatmoMetaDataEntity],
        synchronize: true,
        dropSchema: dropSchemaAtEveryStart,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
