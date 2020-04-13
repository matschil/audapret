import { IsNumber } from 'class-validator';

export class MetaDataDto {
  @IsNumber()
  lastRetrievedResponseId: number;

  @IsNumber()
  surveyId: number;
}
