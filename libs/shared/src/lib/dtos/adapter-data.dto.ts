import { IsJSON } from 'class-validator';

export class AdapterDataDto {
  @IsJSON()
  content: any;
}
