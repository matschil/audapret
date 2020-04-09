import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards
} from '@nestjs/common';
import { CustomValidationPipe } from '../pipe/validation.pipe';
import {
  InitializationPayloadDto,
  DetailLevel,
  GrantedAction
} from '@audapret/shared';
import { InitializationGuard } from '../guard/initialization.guard';
import { GrantService } from '../grant/grant.service';

@Controller('initialization')
export class InitializationController {
  constructor(private readonly grantService: GrantService) {}

  /** Initialization of studyDataManager.
   *  Creates the owner grant for the requester that is specified in @body initializationPayloadDto.
   *  Can only be called once
   */
  @Post()
  @UsePipes(new CustomValidationPipe())
  @UseGuards(InitializationGuard)
  async create(@Body() initializationPayloadDto: InitializationPayloadDto) {
    const grantEntity = this.grantService.createGrant({
      detailLevel: DetailLevel.FULL,
      grantedActions: [
        GrantedAction.READ,
        GrantedAction.DELETE,
        GrantedAction.UPDATE
      ],
      requester: initializationPayloadDto.ownersName
    });
    // Manually set owner properties
    grantEntity.isOwner = true;
    grantEntity.id = 1;

    await this.grantService.saveGrantEntity(grantEntity);
  }
}
