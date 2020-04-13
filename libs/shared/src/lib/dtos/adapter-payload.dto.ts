import { IsString, IsJSON } from 'class-validator';

export class AdapterPayloadDto {
  @IsString()
  source: string;

  @IsString()
  description: string;

  @IsJSON()
  content: any;
}
