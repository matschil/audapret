import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestingService } from './testing.service';
import { TestingController } from './testing.controller';
import { MetaDataEntity } from '../entity/meta.entity';
import { AdapterAuthEntity } from '../entity/adapter-auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MetaDataEntity, AdapterAuthEntity])],
  controllers: [TestingController],
  providers: [TestingService]
})
export class TestingModule {}
