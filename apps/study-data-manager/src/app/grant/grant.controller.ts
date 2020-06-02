import {
  Controller,
  Post,
  Body,
  UsePipes,
  UseGuards,
  Get,
  HttpException,
  Put,
} from "@nestjs/common";
import {
  UserType,
  CreateGrantPayloadDto,
  UpdateGrantPayloadDto,
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
   * If createGrantPayloadDto is invalid: Response 400
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

  /**
   * @param updateGrantPayloadDto
   * If updateGrantPayloadDto is invalid: Response 400
   * If the requester is not the Owner of the studyDataManager: Response 403
   * Otherwise, a new User with the role Researcher is created with the respective grant
   */
  @Put()
  @UseGuards(GrantGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe())
  @Owner()
  async update(@Body() updateGrantPayloadDto: UpdateGrantPayloadDto) {
    const userToUpdate = await this.userService.findUserByName(
      updateGrantPayloadDto.username
    );

    if (!userToUpdate) {
      throw new HttpException("Grant for this user does not yet exists", 400);
    }
    // Update Grant accordingly
    userToUpdate.grant.detailLevel = updateGrantPayloadDto.detailLevel;

    return this.userService.updateUser(userToUpdate);
  }
  @Get()
  @UseGuards(GrantGuard)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new CustomValidationPipe())
  @Owner()
  async getAll() {
    return this.userService.getAllUsers();
  }
}
