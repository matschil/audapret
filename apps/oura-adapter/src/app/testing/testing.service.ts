import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaDataEntity } from '../entity/meta.entity';
import { OuraCategory } from '../../assets/shared';
import { AdapterAuthEntity } from '../entity/adapter-auth.entity';
import { OuraMetaDataDto } from '../../assets/meta-data.dto';

@Injectable()
export class TestingService {
  constructor(
    @InjectRepository(MetaDataEntity)
    private readonly metaDataRepository: Repository<MetaDataEntity>,
    @InjectRepository(AdapterAuthEntity)
    private readonly adapterAuthRepository: Repository<AdapterAuthEntity>
  ) {}

  // For Get-Requests
  async findMetaEntityByCategory(
    category:
      | OuraCategory.SLEEP
      | OuraCategory.ACTIVITY
      | OuraCategory.READINESS
  ): Promise<MetaDataEntity> {
    return this.metaDataRepository.findOne({
      where: { category: category }
    });
  }

  async findLatestAuthEntity(): Promise<AdapterAuthEntity> {
    return this.adapterAuthRepository.findOne();
  }
  async deleteAllMetaEntities(): Promise<void> {
    return this.metaDataRepository.clear();
  }
  async updateMetaDataEntity(id: number, metaData: OuraMetaDataDto) {
    const metaDataEntity: any = metaData;
    metaDataEntity.id = id;
    return this.metaDataRepository.save(<MetaDataEntity>metaDataEntity);
  }
}
