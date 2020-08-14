import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import {
  studyAdministratorPort,
  studyAdministratorStudyPath,
} from "../../assets/config";
import { StudyDto, StudyUserDto } from "@audapret/administrator";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

@Injectable()
export class CreateStudyService {
  constructor(private readonly httpClient: HttpClient) {}
  private users: StudyUserDto[] = [];

  createStudy(studyDto: StudyDto) {
    return this.httpClient.post(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`,
      studyDto
    );
  }
  getStudies() {
    return this.httpClient.get(
      `${environment.STUDY_ADMINISTRATOR_ADDRESS}:${studyAdministratorPort}${studyAdministratorStudyPath}`
    );
  }

  getUsers() {
    return this.users;
  }
  resetUsers() {
    this.users = [];
  }
  addUser(user: StudyUserDto) {
    this.users.push(user);
  }
  removeUser(userToRemove: StudyUserDto) {
    this.users = this.getUsers().filter(
      (user) => user.name !== userToRemove.name
    );
  }
  updateUser(userToUpdate: StudyUserDto) {
    this.users = this.users.map((user) => {
      if (user.name === userToUpdate.name) {
        return userToUpdate;
      }
      return user;
    });
  }
}
