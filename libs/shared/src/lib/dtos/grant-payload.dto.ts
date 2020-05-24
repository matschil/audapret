import { IsString, IsArray } from "class-validator";
import { GrantedAction, DetailLevel } from "@audapret/shared";

export class GrantPayloadDto {
  //userId: number
  @IsArray()
  grantedActions: GrantedAction[];

  @IsString()
  detailLevel: DetailLevel;
}
