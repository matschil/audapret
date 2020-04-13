import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Query
} from '@nestjs/common';
import { AdapterDataService } from './adapter-data.service';
import {
  AdapterPayloadDto,
  GrantedAction,
  AdapterDataDto
} from '@audapret/shared';
import { DataSourceEntity } from '../entity/data-source.entity';
import { AdapterDataEntity } from '../entity/adapter-data.entity';
import { CustomValidationPipe } from '../pipe/validation.pipe';
import { ContentSchemaEntity } from '../entity/content-schema.entity';
import { Grants } from '../decorator/grant.decorator';
import { GrantGuard } from '../guard/grant.guard';
import { DataSourceService } from '../data-source/data-source.service';

@Controller('adapterData')
export class AdapterDataController {
  constructor(
    private readonly adapterDataService: AdapterDataService,
    private readonly dataSourceService: DataSourceService
  ) {}

  /**
   * This route can only be called with a valid adapterPayloadDto.
   * If the sent data is not a valid adapterPayloadDto, the response is 400
   * If the sent data is a valid adapterPayloadDto, the persistance workflow begins and ultimately stores
   * the adapterPayloadDto accordingly to the database
   * @param adapterPayloadDto
   */
  @Post()
  @UseGuards(GrantGuard)
  @Grants(GrantedAction.CREATE)
  @UsePipes(new CustomValidationPipe())
  async persistanceWorkflow(@Body() adapterPayloadDto: AdapterPayloadDto) {
    let dataSource: DataSourceEntity = this.dataSourceService.createDataSourceEntity(
      { source: adapterPayloadDto.source }
    );
    let adapterData: AdapterDataEntity = this.adapterDataService.createAdapterDataEntity(
      {
        content: JSON.parse(adapterPayloadDto.content)
      }
    );
    let existingDataSource: DataSourceEntity;
    let validSchema: ContentSchemaEntity;
    try {
      // 1. check if the source is already represented in the schema
      existingDataSource = await this.dataSourceService.findDataSourceEntity(
        dataSource.source
      );
      if (existingDataSource === undefined) {
        // create new DataSourceEntity
        const dataSourceEntity = this.dataSourceService.createDataSourceEntity(
          dataSource
        );

        // save DataSourceEntity
        dataSource = await this.dataSourceService.saveDataSourceEntity(
          dataSourceEntity
        );
      } else {
        dataSource = existingDataSource;
      }

      // 2. Load the schemas for the source
      const schemas: ContentSchemaEntity[] = await this.adapterDataService.findContentSchemaEntitiesByDataSource(
        dataSource
      );
      // 3. Compare if a schema is valid for the payload
      if (schemas.length > 0) {
        validSchema = this.adapterDataService.getValidSchema(
          adapterData,
          schemas
        );
      }
      // 4 If no Schema is valid -> Insert new schema
      if (validSchema === undefined) {
        // 4.1 Generate a new schema from the payload
        validSchema = await this.adapterDataService.generateNewSchema(
          adapterData,
          dataSource
        );

        // 4.2 Persist the schema
        validSchema = await this.adapterDataService.insertContentSchemaEntity(
          validSchema
        );
      }
      // 5. Create AdapterDataEntity with related SchemaEntity
      adapterData.contentSchema = validSchema;
      const adapterDataEntity = this.adapterDataService.createAdapterDataEntity(
        adapterData
      );

      // 5. Insert AdapterDataEntity
      const result = await this.adapterDataService.saveAdapterDataEntity(
        adapterDataEntity
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * This function returns AdapterDataDtos for all AdapterDataEntities of the specified @param source
   */
  @Get()
  @UseGuards(GrantGuard)
  @Grants(GrantedAction.READ)
  async getAllDataForSource(@Query('source') source: string) {
    // Get all AdapterDataEntities
    const adapterDataEntities: AdapterDataEntity[] = await this.adapterDataService.getAdapterDataForSource(
      source
    );
    // Transform to AdapterDataDtos
    const adapterDataDtos: AdapterDataDto[] = adapterDataEntities.map(
      adapterDataEntity => ({ content: adapterDataEntity.content })
    );

    return adapterDataDtos;
  }

  /**
   * This function returns AdapterDataDtos for all AdapterDataEntities
   */
  @Get('all')
  @UseGuards(GrantGuard)
  @Grants(GrantedAction.READ)
  async getAllData() {
    // Get all AdapterDataEntities
    const adapterDataEntities: AdapterDataEntity[] = await this.adapterDataService.getAllAdapterData();
    // Transform to AdapterDataDtos
    const adapterDataDtos: AdapterDataDto[] = adapterDataEntities.map(
      adapterDataEntity => ({ content: adapterDataEntity.content })
    );

    return adapterDataDtos;
  }
}
