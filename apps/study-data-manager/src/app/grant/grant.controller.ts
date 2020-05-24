import { Controller, Post, Body, UsePipes, UseGuards } from "@nestjs/common";
import { GrantPayloadDto } from "@audapret/shared";
import { CustomValidationPipe } from "../pipe/validation.pipe";
import { GrantGuard } from "../guard/grant.guard";
import { GrantService } from "./grant.service";
import { Owner } from "../decorator/owner.decorator";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Controller("grant")
export class GrantController {
  constructor(private readonly grantService: GrantService) {}

  /**
   * @param grantPayloadDto
   * If grantPayloadDto is invalid: Response 400
   * If the requester is not the Owner of the studyDataManager: Response 403
   * Otherwise, the grant is persisted to the database
   */
  @Post()
  //@UseGuards(GrantGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe())
  @Owner()
  async create(@Body() grantPayloadDto: GrantPayloadDto) {
    console.log(grantPayloadDto);
    const grantEntity = this.grantService.createGrant(grantPayloadDto);
    return await this.grantService.saveGrantEntity(grantEntity);
  }
}
