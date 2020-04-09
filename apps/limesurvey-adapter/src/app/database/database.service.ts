import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository, Connection } from 'typeorm';
import { MetaDataEntity } from '../entity/meta.entity';
import { MetaDataDto } from '../../assets/meta-data.dto';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(MetaDataEntity)
    private readonly metaDataRepository: Repository<MetaDataEntity>
  ) {}

  async getMetaDataEntity(surveyId: string) {
    return await this.metaDataRepository.findOne({
      where: { surveyId: surveyId }
    });
  }

  async saveMetaDataEntity(metaDataEntity: MetaDataEntity) {
    return await this.metaDataRepository.save(metaDataEntity);
  }

  createMetaDataEntity(metaDataDto: MetaDataDto) {
    return this.metaDataRepository.create(metaDataDto);
  }
}
