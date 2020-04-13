import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { MetaDataEntity } from '../entity/meta.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MetaDataEntity])],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
