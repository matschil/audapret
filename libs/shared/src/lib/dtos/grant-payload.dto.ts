import { IsString, IsArray } from 'class-validator';
import { GrantedAction, DetailLevel } from '@audapret/shared';

export class GrantPayloadDto {
  @IsString()
  requester: string;

  @IsArray()
  grantedActions: GrantedAction[];

  @IsString()
  detailLevel: DetailLevel;
}
