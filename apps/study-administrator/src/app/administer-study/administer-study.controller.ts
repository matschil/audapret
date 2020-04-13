import { Controller, Get, Post, Body } from '@nestjs/common';

import { AdministerStudyService } from './administer-study.service';
import { StudyDto } from '@audapret/administrator';

@Controller('study')
export class StudyController {
  constructor(private readonly studyService: AdministerStudyService) {}

  @Get()
  async getAllStudies(): Promise<StudyDto[]> {
    const studyEntities = await this.studyService.getAllStudies();
    const studyDtos = studyEntities.map(study => study.toDto());
    return studyDtos;
  }

  @Post()
  createStudy(@Body() studyDto: StudyDto) {
    const studyEntity = this.studyService.createStudy(studyDto);
    return this.studyService.saveStudy(studyEntity);
  }
}
