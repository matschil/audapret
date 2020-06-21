import { IsEnum, IsDate } from "class-validator";
import { OuraCategory } from "apps/fitbit-adapter/src/assets/shared";

export class OuraMetaDataDto {
  @IsDate()
  lastSuccessfulRetrieval: Date;

  @IsEnum(OuraCategory)
  category: OuraCategory;
}
