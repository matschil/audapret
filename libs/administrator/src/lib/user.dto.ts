import { UserType } from './dtos/shared';

export interface UserDto {
  studyDataManagerAddress: string;
  name: string;
  userType: UserType;
}
