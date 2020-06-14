import { StudyUserDto } from "../user.dto";

export interface StudyDto {
  studyTitle: string;
  users: StudyUserDto[];
}
