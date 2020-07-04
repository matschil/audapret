import { Injectable } from "@nestjs/common";

import { DataSourceEntity } from "../entity/data-source.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DataSourceDto } from "@audapret/shared";

@Injectable()
export class DataSourceService {
  constructor(
    @InjectRepository(DataSourceEntity)
    private readonly dataSourceRepository: Repository<DataSourceEntity>
  ) {}

  /** TypeOrm Delegation for getting all DataSourceEntities
   */
  async getAllDataSources() {
    return await this.dataSourceRepository.find();
  }

  /** TypeOrm Delegation for creating a DataSourceEntity from a DataSourceDto
   *  @param dataSource
   */
  createDataSourceEntity(dataSource: DataSourceDto) {
    return this.dataSourceRepository.create(dataSource);
  }

  /** @returns one DataSourceEntity whose source is @param sourceName */
  async findDataSourceEntity(sourceName: string): Promise<DataSourceEntity> {
    return this.dataSourceRepository.findOne({ where: { source: sourceName } });
  }

  /** TypeOrm Delegation for saving a DataSourceEntity (create or update)
   *  @param dataSource
   */
  async saveDataSourceEntity(
    dataSource: DataSourceEntity
  ): Promise<DataSourceEntity> {
    try {
      return this.dataSourceRepository.save(dataSource);
    } catch (error) {
      console.error(error.message);
    }
  }
}
