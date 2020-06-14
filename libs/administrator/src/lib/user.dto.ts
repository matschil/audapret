import { UserType } from "./dtos/shared";

export interface StudyUserDto {
  studyDataManagerAddress: string;
  name: string;
  userType: UserType;
}
