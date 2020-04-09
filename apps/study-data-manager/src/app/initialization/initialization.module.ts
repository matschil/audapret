import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantEntity } from '../entity/grant.entity';
import { GrantModule } from '../grant/grant.module';
import { GuardModule } from '../guard/guard.module';
import { InitializationController } from './initialization.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GrantEntity]), GuardModule, GrantModule],
  controllers: [InitializationController],
  providers: []
})
export class InitializationModule {}
