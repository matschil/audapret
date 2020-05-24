import { Injectable } from "@nestjs/common";
import { UserDto, GrantPayloadDto } from "@audapret/shared";
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
  async createUser(user: UserDto, grant: GrantEntity): Promise<UserEntity> {
    const userEntity: UserEntity = {
      password: user.password,
      username: user.username,
      grant,
    };
    return this.userRepository.save(userEntity);
  }
}
