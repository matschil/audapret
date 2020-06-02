import { Module } from "@nestjs/common";
import { AdapterDataController } from "./adapter-data.controller";
import { AdapterDataService } from "./adapter-data.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrantEntity } from "../entity/grant.entity";
import { GrantModule } from "../grant/grant.module";
import { GuardModule } from "../guard/guard.module";
import { AdapterDataEntity } from "../entity/adapter-data.entity";
import { ContentSchemaEntity } from "../entity/content-schema.entity";
import { DataSourceEntity } from "../entity/data-source.entity";
import { DataSourceModule } from "../data-source/data-source.module";
import { GrantGuard } from "../guard/grant.guard";
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
    GrantModule,
    DataSourceModule,
    UserModule,
  ],
  controllers: [AdapterDataController],
  providers: [AdapterDataService],
})
export class AdapterDataModule {}
