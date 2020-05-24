import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  UseGuards,
} from "@nestjs/common";
import { CustomValidationPipe } from "../pipe/validation.pipe";
import { UserDto, DetailLevel, GrantedAction } from "@audapret/shared";
import { InitializationGuard } from "../guard/initialization.guard";
import { GrantService } from "../grant/grant.service";
import { UserService } from "../user/user.service";

@Controller("initialization")
export class InitializationController {
  constructor(
    private readonly grantService: GrantService,
    private readonly userService: UserService
  ) {}

  /** Initialization of studyDataManager.
   *  Creates the owner grant for the requester that is specified in @body initializationPayloadDto.
   *  Can only be called once
   */
  @Post()
  @UsePipes(new CustomValidationPipe())
  @UseGuards(InitializationGuard)
  async create(@Body() userDto: UserDto) {
    const grantEntity = this.grantService.createGrant({
      detailLevel: DetailLevel.FULL,
      grantedActions: [
        GrantedAction.READ,
        GrantedAction.DELETE,
        GrantedAction.UPDATE,
      ],
      requester: userDto.username,
    });
    // Manually set owner properties
    grantEntity.isOwner = true;
    grantEntity.id = 1;

    // Todo: Inconsistent. Decide wether to take Dtos or entities
    const user = await this.userService.createUser(userDto, grantEntity);
    return user;
  }
}
