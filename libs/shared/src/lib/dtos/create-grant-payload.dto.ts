import { IsString, IsArray } from "class-validator";
import { GrantedAction, DetailLevel } from "@audapret/shared";
import { GrantPayloadDto } from "./grant-payload.dto";

export class CreateGrantPayloadDto extends GrantPayloadDto {
  @IsString()
  username: string;
}

export class UpdateGrantPayloadDto extends GrantPayloadDto {
  @IsString()
  username: string;
}
