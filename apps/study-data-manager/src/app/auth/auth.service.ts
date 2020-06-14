import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserDto } from "@audapret/shared";
import { comparePasswords } from "../encryption";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByName(username);
    if (!user) {
      return null;
    }
    if (await comparePasswords(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const userEntity = await this.userService.findUserByName(user.username);
    const payload = { username: user.username, sub: userEntity.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
