import { Controller, Get, Query, Delete, Put, Body } from '@nestjs/common';
import { TestingService } from './testing.service';
import { OuraCategory } from '../../assets/shared';
import { OuraMetaDataDto } from '../../assets/meta-data.dto';

/**
 * All the routes specified in this class are only implemented for testing purposes.
 * They will be disabled for production
 */
@Controller('test')
export class TestingController {
  constructor(private readonly testingService: TestingService) {}

  @Get('metaEntity')
  async getMetaEntity(@Query('category') category: OuraCategory) {
    return this.testingService.findMetaEntityByCategory(category);
  }
  @Get('authEntity')
  async getAuthEntity() {
    return this.testingService.findLatestAuthEntity();
  }
  @Delete('allMetaEntities')
  async deleteAllMetaEntites() {
    return this.testingService.deleteAllMetaEntities();
  }
  @Put('metaEntity')
  async updateMetaDataEntity(
    @Query('id') id: string,
    @Body() metaDataDto: OuraMetaDataDto
  ) {
    return this.testingService.updateMetaDataEntity(parseInt(id), metaDataDto);
  }
}
