import { Module, Global, HttpModule } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';

@Global()
@Module({
  imports: [HttpModule, AuthModule, DatabaseModule],
  controllers: [CronController],
  providers: [CronService]
})
export class CronModule {}
