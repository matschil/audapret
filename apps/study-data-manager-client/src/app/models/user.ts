import { UserDto } from "@audapret/shared";

export class User extends UserDto {
  username: string;
  password: string;
  access_token: string;
}
