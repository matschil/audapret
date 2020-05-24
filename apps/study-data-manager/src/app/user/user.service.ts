import { Injectable } from "@nestjs/common";
import { UserDto, GrantPayloadDto, UserType } from "@audapret/shared";
import { UserEntity } from "../entity/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GrantEntity } from "../entity/grant.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}
  async findUserByName(name: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { username: name } });
  }

  async createAdapterUser(user: UserDto, grant: GrantPayloadDto) {
    this.createUser(user, grant, UserType.ADAPTER);
  }
  async createResearcherUser(user: UserDto, grant: GrantPayloadDto) {
    this.createUser(user, grant, UserType.RESEARCHER);
  }
  async createOwnerUser(user: UserDto, grant: GrantPayloadDto) {
    this.createUser(user, grant, UserType.OWNER);
  }
  async createUser(
    user: UserDto,
    grant: GrantPayloadDto,
    type: UserType
  ): Promise<UserEntity> {
    const userEntity: UserEntity = {
      type,
      password: user.password,
      username: user.username,
      grant,
    };
    return this.userRepository.save(userEntity);
  }
}
