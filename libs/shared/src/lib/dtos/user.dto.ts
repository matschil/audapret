import { IsString } from "class-validator";
import { GrantPayloadDto } from "./grant-payload.dto";
import { UserType } from "../global.config";

export class UserDto {
  @IsString()
  password: string;
  @IsString()
  username: string;

  type?: UserType;
  grant?: GrantPayloadDto;
}
