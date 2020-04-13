import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrantEntity } from '../entity/grant.entity';
import { GrantModule } from '../grant/grant.module';
import { GuardModule } from '../guard/guard.module';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';
import { ContentSchemaEntity } from '../entity/content-schema.entity';
import { AdapterDataEntity } from '../entity/adapter-data.entity';
import { DataSourceEntity } from '../entity/data-source.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      GrantEntity,
      ContentSchemaEntity,
      AdapterDataEntity,
      DataSourceEntity
    ]),
    GuardModule,
    GrantModule
  ],
  controllers: [TestingController],
  providers: [TestingService]
})
export class TestingModule {}
