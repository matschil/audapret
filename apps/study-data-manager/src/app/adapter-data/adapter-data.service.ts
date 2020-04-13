import { Injectable } from '@nestjs/common';
import { Validator, Schema } from 'jsonschema';
import * as toJsonSchema from 'to-json-schema';
import { ContentSchemaEntity } from '../entity/content-schema.entity';
import { DataSourceEntity } from '../entity/data-source.entity';
import { AdapterDataEntity } from '../entity/adapter-data.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AdapterDataDto } from '@audapret/shared';

@Injectable()
export class AdapterDataService {
  validator: Validator;
  constructor(
    @InjectRepository(ContentSchemaEntity)
    private readonly contentSchemaRepository: Repository<ContentSchemaEntity>,
    @InjectRepository(AdapterDataEntity)
    private readonly adapterDataRepository: Repository<AdapterDataEntity>,
    @InjectRepository(DataSourceEntity)
    private readonly dataSourceRepository: Repository<DataSourceEntity>
  ) {
    this.validator = new Validator();
  }

  /** The functions iterates the schemas and validates the adapterData with each schema.
   * @returns first schema that validated adapterDto
   * @param adapterData The AdapterDataEntity that has to be validated
   * @param schemas Array of ContentSchemaEntities
   */
  getValidSchema(
    adapterData: AdapterDataEntity,
    schemas: ContentSchemaEntity[]
  ) {
    for (const schema of schemas) {
      const jsonSchema: Schema = schema.schema;
      const validationResult = this.validator.validate(
        adapterData.content,
        jsonSchema
      );
      if (validationResult.valid) {
        return schema;
      }
    }
    return undefined;
  }

  /**
   * Generates json schema from @param adapterData and save it to database
   * @param adapterData The adapterData the schema should be generated from
   * @param dataSource The respective source of the adapterData
   * @returns A JSON schema that validates the argument adapterData.
   * All attributes of the schema are set to required.
   */
  async generateNewSchema(
    adapterData: AdapterDataEntity,
    dataSource: DataSourceEntity
  ): Promise<ContentSchemaEntity> {
    const generatedSchema: any = toJsonSchema(adapterData.content, {
      required: true
    });
    return this.contentSchemaRepository.create({
      schema: generatedSchema,
      dataSource: dataSource
    });
  }

  /** TypeOrm Delegation for saving a ContentSchemaEntity (create or update)
   *  @param contentSchema
   */
  async insertContentSchemaEntity(contentSchema: ContentSchemaEntity) {
    try {
      const result = await this.contentSchemaRepository.save(contentSchema);
      return result;
    } catch (error) {
      console.error(error.message);
    }
  }

  /** TypeOrm Delegation for saving an AdapterDataEntity (create or update)
   *  @param contentSchema
   */
  async saveAdapterDataEntity(adapterData: AdapterDataEntity) {
    try {
      return this.adapterDataRepository.manager.save(adapterData);
    } catch (error) {
      console.error(error.message);
    }
  }

  /** @returns all contentSchemaEntities whose source is @param sourceForSchema */
  async findContentSchemaEntitiesByDataSource(
    sourceForSchema: DataSourceEntity
  ): Promise<ContentSchemaEntity[]> {
    sourceForSchema = this.dataSourceRepository.create(sourceForSchema);
    return this.contentSchemaRepository.find({
      where: {
        dataSource: sourceForSchema
      }
    });
  }

  /** TypeOrm Delegation for creating an AdapterDataEntity from an AdapterDataDto
   *  @param dataSource
   */
  createAdapterDataEntity(adapterData: AdapterDataDto) {
    return this.adapterDataRepository.create(adapterData);
  }

  /** @returns all AdapterDataEntities with source @param source */
  async getAdapterDataForSource(source: string) {
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
      order: { createdAt: 'DESC' }
    });
    return relevantAdapterData;
  }

  /** TypeOrm Delegation for getting all existing AdapterDataEntites
   */
  async getAllAdapterData() {
    return this.adapterDataRepository.find();
  }

  /** TypeOrm Delegation for getting all existing ContentSchemaEntites with nested DataSource
   */
  async getAllSchemas() {
    const nestedContentSchemas = await this.contentSchemaRepository.find({
      join: {
        alias: 'nestedSchema',
        innerJoinAndSelect: {
          dataSource: 'nestedSchema.dataSource'
        }
      }
    });
    return nestedContentSchemas;
  }
}
