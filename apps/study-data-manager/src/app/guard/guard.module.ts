import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GrantEntity } from "../entity/grant.entity";
import { GrantGuard } from "./grant.guard";
import { GrantModule } from "../grant/grant.module";
import { InitializationGuard } from "./initialization.guard";
import { UserModule } from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([GrantEntity]), GrantModule, UserModule],
  providers: [GrantGuard, InitializationGuard],
})
export class GuardModule {}
