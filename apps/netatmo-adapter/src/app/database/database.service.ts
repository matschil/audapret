import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as _ from 'lodash';
import { Repository, Connection } from 'typeorm';
import { NetatmoMetaDataEntity } from '../entity/meta.entity';
import { NetatmoMetaDataDto } from '../../assets/meta-data.dto';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly connection: Connection,
    @InjectRepository(NetatmoMetaDataEntity)
    private readonly metaDataRepository: Repository<NetatmoMetaDataEntity>
  ) {}

  async getMetaDataEntity() {
    return await this.metaDataRepository.findOne();
  }

  async saveMetaDataEntity(metaDataEntity: NetatmoMetaDataEntity) {
    return await this.metaDataRepository.save(metaDataEntity);
  }

  createMetaDataEntity(metaDataDto: NetatmoMetaDataDto) {
    return this.metaDataRepository.create(metaDataDto);
  }
}
