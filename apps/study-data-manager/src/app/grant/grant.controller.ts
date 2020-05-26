import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Get,
  HttpException,
} from "@nestjs/common";
import {
  GrantPayloadDto,
  UserType,
  CreateGrantPayloadDto,
} from "@audapret/shared";
import { CustomValidationPipe } from "../pipe/validation.pipe";
import { GrantGuard } from "../guard/grant.guard";
import { UserService } from "../user/user.service";
import { Owner } from "../decorator/owner.decorator";
import { JwtAuthGuard } from "../guard/jwt-auth.guard";

@Controller("grant")
export class GrantController {
  constructor(private readonly userService: UserService) {}

  /**
   * @param createGrantPayloadDto
   * If grantPayloadDto is invalid: Response 400
   * If the requester is not the Owner of the studyDataManager: Response 403
   * Otherwise, a new User with the role Researcher is created with the respective grant
   */
  @Post()
  @UseGuards(GrantGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe())
  @Owner()
  async create(@Body() createGrantPayloadDto: CreateGrantPayloadDto) {
    const userAlreadyExists =
      (await this.userService.findUserByName(
        createGrantPayloadDto.username
      )) !== undefined;

    if (userAlreadyExists) {
      throw new HttpException("Grant for this user already exists", 400);
    }
    return this.userService.createUser(
      {
        password: "default",
        type: UserType.RESEARCHER,
        username: createGrantPayloadDto.username,
      },
      {
        detailLevel: createGrantPayloadDto.detailLevel,
        grantedActions: createGrantPayloadDto.grantedActions,
      }
    );
  }

  @Get("getAll")
  //@UseGuards(GrantGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe())
  @Owner()
  async getAll() {
    return this.userService.getAllUsers();
  }
}
