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
    return this.userRepository.findOne({
      relations: ["grant"],
      where: { username: name },
    });
  }
  async getOwner(): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { type: UserType.OWNER } });
  }
  async getAllUsers(): Promise<UserEntity[]> {
    const allUsers = await this.userRepository.find({ relations: ["grant"] });
    return allUsers;
  }

  async createAdapterUser(user: UserDto, grant: GrantPayloadDto) {
    user.type = UserType.ADAPTER;
    this.createUser(user, grant);
  }
  async createResearcherUser(user: UserDto, grant: GrantPayloadDto) {
    user.type = UserType.RESEARCHER;
    this.createUser(user, grant);
  }
  async createOwnerUser(user: UserDto, grant: GrantPayloadDto) {
    user.type = UserType.OWNER;
    this.createUser(user, grant);
  }

  async createUser(user: UserDto, grant: GrantPayloadDto): Promise<UserEntity> {
    const userEntity: UserEntity = {
      type: user.type,
      password: user.password,
      username: user.username,
      grant,
    };
    return this.userRepository.save(userEntity);
  }

  async updateGrantForUser(username: string, newGrant: GrantPayloadDto) {
    const userToUpdate = await this.findUserByName(username);
    userToUpdate.grant = newGrant;
    return await this.userRepository.save(userToUpdate);
  }
}
