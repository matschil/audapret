import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudyEntity } from '../entity/study.entity';
import { Repository } from 'typeorm';
import { StudyDto } from '@audapret/administrator';

@Injectable()
export class AdministerStudyService {
  constructor(
    @InjectRepository(StudyEntity)
    private readonly studyRepository: Repository<StudyEntity>
  ) {}
  getData(): { message: string } {
    return { message: 'Welcome to study-administrator!' };
  }
  getAllStudies() {
    return this.studyRepository.find({ relations: ['users'] });
  }
  createStudy(studyDto: StudyDto) {
    return this.studyRepository.create(studyDto);
  }
  saveStudy(studyEntity: StudyEntity) {
    return this.studyRepository.save(studyEntity);
  }
}
