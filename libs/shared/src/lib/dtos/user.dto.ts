import { IsString } from "class-validator";

export class UserDto {
  @IsString()
  password: string;
  @IsString()
  username: string;
}
