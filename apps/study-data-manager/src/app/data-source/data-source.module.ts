import { Module } from "@nestjs/common";

import { DataSourceController } from "./data-source.controller";
import { DataSourceService } from "./data-source.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrantEntity } from "../entity/grant.entity";
import { GrantModule } from "../grant/grant.module";
import { GuardModule } from "../guard/guard.module";
import { AdapterDataEntity } from "../entity/adapter-data.entity";
import { ContentSchemaEntity } from "../entity/content-schema.entity";
import { DataSourceEntity } from "../entity/data-source.entity";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GrantEntity,
      AdapterDataEntity,
      ContentSchemaEntity,
      DataSourceEntity,
    ]),
    GuardModule,
    UserModule,

    GrantModule,
  ],
  controllers: [DataSourceController],
  providers: [DataSourceService],
  exports: [DataSourceService],
})
export class DataSourceModule {}
