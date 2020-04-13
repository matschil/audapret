import { IsString } from 'class-validator';

export class InitializationPayloadDto {
  @IsString()
  ownersName: string;
}
