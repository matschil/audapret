import { IsJSON, IsString, IsArray, IsEnum, IsDate } from 'class-validator';

export class ContentSchemaDto {
  @IsString()
  source: string;

  @IsJSON()
  schema: any;
}
