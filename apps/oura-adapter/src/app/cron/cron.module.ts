import { Module, Global, HttpModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdapterAuthEntity } from "../entity/adapter-auth.entity";
import { CronService } from "./cron.service";
import { ScheduleModule } from "@nestjs/schedule";
import { CronScheduleService } from "./cron-schedule.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([AdapterAuthEntity]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [CronService, CronScheduleService],
  exports: [CronService],
})
export class CronModule {}
