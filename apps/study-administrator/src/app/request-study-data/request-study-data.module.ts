import { Module, HttpModule } from '@nestjs/common';
import { RequestStudyDataController } from './request-study-data.controller';
import { RequestStudyDataService } from './request-study-data.service';
import { UserEntity } from '../entity/user.entity';
import { StudyEntity } from '../entity/study.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudyEntity, UserEntity]), HttpModule],
  controllers: [RequestStudyDataController],
  providers: [RequestStudyDataService]
})
export class RequestStudyDataModule {
  constructor(private readonly connection: Connection) {}
}
