import { Module } from "@nestjs/common";
import { AdapterDataModule } from "./adapter-data/adapter-data.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { DataSourceEntity } from "./entity/data-source.entity";
import { AdapterDataEntity } from "./entity/adapter-data.entity";
import { ContentSchemaEntity } from "./entity/content-schema.entity";
import { GrantEntity } from "./entity/grant.entity";
import { GrantModule } from "./grant/grant.module";
import { GuardModule } from "./guard/guard.module";
import { TestingModule } from "./testing/testing.module";
import { DataSourceModule } from "./data-source/data-source.module";
import { InitializationModule } from "./initialization/initialization.module";
import { dropSchemaAtEveryStart } from "../assets/config";

@Module({
  imports: [
    AdapterDataModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        name: "study_data_manager",
        type: "postgres",
        host: `${process.env.STUDY_DATA_MANAGER_DB}`,
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "study_data_manager",
        entities: [
          AdapterDataEntity,
          ContentSchemaEntity,
          DataSourceEntity,
          GrantEntity,
        ],
        synchronize: true,
        dropSchema: dropSchemaAtEveryStart,
      }),
    }),
    GrantModule,
    GuardModule,
    TestingModule,
    DataSourceModule,
    InitializationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
