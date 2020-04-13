import { Module } from '@nestjs/common';
import { StudyController } from './administer-study.controller';
import { AdministerStudyService } from './administer-study.service';
import { UserEntity } from '../entity/user.entity';
import { StudyEntity } from '../entity/study.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([StudyEntity, UserEntity])],
  controllers: [StudyController],
  providers: [AdministerStudyService]
})
export class AdministerStudyModule {
  constructor(private readonly connection: Connection) {}
}
