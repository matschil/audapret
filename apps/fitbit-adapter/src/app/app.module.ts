import { Module, HttpModule } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { AdapterAuthEntity } from "./entity/adapter-auth.entity";
import { Connection } from "typeorm";
import { AuthModule } from "./auth/auth.module";
import { CronModule } from "./cron/cron.module";
import { DatabaseModule } from "./database/database.module";
import { MetaDataEntity } from "./entity/meta.entity";
import { dropSchemaAtEveryStart } from "../assets/config";

@Module({
  imports: [
    AuthModule,
    HttpModule,
    CronModule,
    DatabaseModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: "fitbit-adapter",
        type: "postgres",
        host: `${process.env.FITBIT_ADAPTER_DB}`,
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "fitbit_adapter",
        entities: [AdapterAuthEntity, MetaDataEntity],
        synchronize: true,
        dropSchema: dropSchemaAtEveryStart,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
