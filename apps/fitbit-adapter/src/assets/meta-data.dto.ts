import { IsEnum, IsDate } from "class-validator";
import { FitbitPath } from "apps/fitbit-adapter/src/assets/shared";

export class FitbitMetaDataDto {
  @IsDate()
  lastSuccessfulRetrieval: Date;

  @IsEnum(FitbitPath)
  path: FitbitPath;
}
