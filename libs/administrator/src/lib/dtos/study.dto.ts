import { UserDto } from '../user.dto';

export interface StudyDto {
  studyTitle: string;
  users: UserDto[];
}
