import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './database.service';
import { NetatmoMetaDataEntity } from '../entity/meta.entity';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([NetatmoMetaDataEntity])],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
