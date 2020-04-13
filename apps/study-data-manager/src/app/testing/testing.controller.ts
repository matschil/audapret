import { Controller, Get, Delete, Query, Post, Body } from '@nestjs/common';
import { TestingService } from './testing.service';
import { GrantEntity } from '../entity/grant.entity';

/**
 * All the routes specified in this class are only implemented for testing purposes.
 * They will be disabled for production
 */
@Controller('test')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Get('test')
  test(){
    return "test"
  }

  @Get('nestedAdapterData')
  async getNestedAdapterData(@Query('id') id: number) {
    return this.testingService.findNestedAdapterDataEntity(id);
  }

  @Get('nestedContentSchema')
  async getNestedContentSchema(@Query('id') id: number) {
    return this.testingService.findNestedContentSchemaEntity(id);
  }

  @Get('contentSchema')
  async getContentSchema(@Query('id') id: number) {
    return this.testingService.findOneContenSchemaEntity(id);
  }

  @Get('dataSource')
  async getDataSource(@Query('id') id: number) {
    return this.testingService.findOneDataSourceEntity(id);
  }

  @Get('allDataSources')
  async getAllDataSources() {
    return this.testingService.findAllDataSourceEntities();
  }

  @Get('adapterData')
  async getAdapterData(@Query('id') id: number) {
    return this.testingService.findOneAdapterDataEntity(id);
  }

  @Get('lastAdapterData')
  async getLastAdapterData(
    @Query('number') number: number,
    @Query('source') source: string
  ) {
    return this.testingService.getLatestAdapterData(number, source);
  }

  @Get('grant')
  async getGrant(@Query('id') id: number) {
    return this.testingService.findOneGrantEntity(id);
  }

  @Get('allGrants')
  async getAllGrants(@Query('id') id: number) {
    return this.testingService.findAllGrantEntities(id);
  }

  @Delete('contentSchema')
  async deleteContentSchema(@Query('id') id: number) {
    return this.testingService.deleteOneContenSchemaEntity(id);
  }

  @Delete('dataSource')
  async deleteDataSource(@Query('id') id: number) {
    return this.testingService.deleteOneDataSourceEntity(id);
  }

  @Delete('adapterData')
  async deleteAdapterData(@Query('id') id: number) {
    return this.testingService.deleteOneAdapterDataEntity(id);
  }

  @Delete('allAdapterData')
  async deleteAllAdapterData() {
    return this.testingService.deleteAllAdapterDataEntities();
  }

  @Delete('grant')
  async deleteGrant(@Query('id') id: number) {
    return this.testingService.deleteOneGrantEntity(id);
  }

  @Post('grant')
  async postAdapterData(@Body() grant: GrantEntity) {
    return this.testingService.saveGrantEntity(grant);
  }
}
