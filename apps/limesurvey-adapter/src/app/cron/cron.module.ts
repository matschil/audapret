import { Module, Global, HttpModule } from "@nestjs/common";
import { CronService } from "./cron.service";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { ScheduleModule } from "@nestjs/schedule";
import { TasksService } from "./cron-scheduler.service";

@Global()
@Module({
  imports: [HttpModule, AuthModule, DatabaseModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [CronService, TasksService],
})
export class CronModule {}
