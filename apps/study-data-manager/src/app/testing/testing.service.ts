import { Injectable } from '@nestjs/common';
import { ContentSchemaEntity } from '../entity/content-schema.entity';
import { DataSourceEntity } from '../entity/data-source.entity';
import { AdapterDataEntity } from '../entity/adapter-data.entity';
import { Repository, DeleteResult, FindConditions, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GrantEntity } from '../entity/grant.entity';
import { AdapterAuthEntity } from 'apps/oura-adapter/src/app/entity/adapter-auth.entity';

@Injectable()
export class TestingService {
  constructor(
    @InjectRepository(ContentSchemaEntity)
    private readonly contentSchemaRepository: Repository<ContentSchemaEntity>,
    @InjectRepository(AdapterDataEntity)
    private readonly adapterDataRepository: Repository<AdapterDataEntity>,
    @InjectRepository(DataSourceEntity)
    private readonly dataSourceRepository: Repository<DataSourceEntity>,
    @InjectRepository(GrantEntity)
    private readonly grantRepository: Repository<GrantEntity>
  ) {}

  // For Get-Requests
  async findOneDataSourceEntity(id: number): Promise<DataSourceEntity> {
    return this.dataSourceRepository.findOne(id);
  }
  async findAllDataSourceEntities(): Promise<DataSourceEntity[]> {
    return this.dataSourceRepository.find();
  }
  async findOneContenSchemaEntity(id: number): Promise<ContentSchemaEntity> {
    return this.contentSchemaRepository.findOne(id);
  }
  async findOneAdapterDataEntity(id: number): Promise<AdapterDataEntity> {
    return this.adapterDataRepository.findOne(id);
  }

  async getLatestAdapterData(number: number, source: string) {
    // join source, schema and adapterdata table
    const nestedContentSchemas = await this.contentSchemaRepository.find({
      join: {
        alias: 'nestedSchema',
        innerJoinAndSelect: {
          dataSource: 'nestedSchema.dataSource'
        }
      }
    });
    const relevantContentSchemaIds = nestedContentSchemas
      .filter(schema => schema.dataSource.source === source)
      .map(schema => schema.id);

    const relevantAdapterData = await this.adapterDataRepository.find({
      where: { contentSchema: In(relevantContentSchemaIds) },
      order: { createdAt: 'DESC' },
      take: number
    });
    return relevantAdapterData;
  }
  async findNestedContentSchemaEntity(
    id: number
  ): Promise<ContentSchemaEntity> {
    return this.contentSchemaRepository.findOne({
      where: { id: id },
      relations: ['dataSource']
    });
  }
  async findNestedAdapterDataEntity(id: number): Promise<AdapterDataEntity> {
    return this.adapterDataRepository.findOne({
      where: { id: id },
      relations: ['contentSchema']
    });
  }
  async findOneGrantEntity(id: number): Promise<GrantEntity> {
    return this.grantRepository.findOne({
      where: { id: id }
    });
  }
  async findAllGrantEntities(id: number): Promise<GrantEntity[]> {
    return this.grantRepository.find();
  }

  // For Delete-Requests
  async deleteOneDataSourceEntity(id: number): Promise<DeleteResult> {
    return this.dataSourceRepository.delete(id);
  }
  async deleteOneContenSchemaEntity(id: number): Promise<DeleteResult> {
    return this.contentSchemaRepository.delete(id);
  }
  async deleteOneAdapterDataEntity(id: number): Promise<DeleteResult> {
    return this.adapterDataRepository.delete(id);
  }
  async deleteAllAdapterDataEntities(): Promise<void> {
    return this.adapterDataRepository.clear();
  }

  async deleteOneGrantEntity(id: number): Promise<DeleteResult> {
    return this.grantRepository.delete(id);
  }

  // For Post-Requests
  async saveGrantEntity(grant: GrantEntity): Promise<GrantEntity> {
    try {
      const grantEntity = this.grantRepository.create(grant);
      return this.grantRepository.save(grantEntity);
    } catch (err) {
      console.error(err);
    }
  }
}
