import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantService } from './grant.service';
import { GrantController } from './grant.controller';
import { GrantEntity } from '../entity/grant.entity';
@Module({
  imports: [TypeOrmModule.forFeature([GrantEntity])],
  providers: [GrantService],
  exports: [GrantService],
  controllers: [GrantController]
})
export class GrantModule {}
