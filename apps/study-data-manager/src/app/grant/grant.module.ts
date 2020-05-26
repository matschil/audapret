import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrantController } from "./grant.controller";
import { GrantEntity } from "../entity/grant.entity";
import { UserModule } from "../user/user.module";
@Module({
  imports: [TypeOrmModule.forFeature([GrantEntity]), UserModule],
  providers: [],
  exports: [],
  controllers: [GrantController],
})
export class GrantModule {}
