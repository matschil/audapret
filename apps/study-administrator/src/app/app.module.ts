import { Module, HttpModule } from "@nestjs/common";
import { UserEntity } from "./entity/user.entity";
import { StudyEntity } from "./entity/study.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from "typeorm";
import { AdministerStudyModule } from "./administer-study/administer-study.module";
import { RequestStudyDataModule } from "./request-study-data/request-study-data.module";
import { dropSchemaAtEveryStart } from "../assets/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: `${process.env.STUDY_ADMINISTRATOR_DB}`,
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "study_administrator",
        entities: [StudyEntity, UserEntity],
        synchronize: true,
        dropSchema: true /* dropSchemaAtEveryStart */,
      }),
    }),
    HttpModule,
    AdministerStudyModule,
    RequestStudyDataModule,
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
