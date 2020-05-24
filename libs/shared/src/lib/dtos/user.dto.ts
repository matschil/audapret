import { IsString } from "class-validator";
import { GrantPayloadDto } from "./grant-payload.dto";

export class UserDto {
  @IsString()
  password: string;
  @IsString()
  username: string;
}
