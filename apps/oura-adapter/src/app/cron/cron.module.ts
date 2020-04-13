import { Module, Global, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdapterAuthEntity } from '../entity/adapter-auth.entity';
import { CronService } from './cron.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AdapterAuthEntity]), HttpModule],
  providers: [CronService],
  exports: [CronService]
})
export class CronModule {}
