import { Component } from "@angular/core";
import { StudyUserDto } from "@audapret/administrator";
import { StudyDto } from "@audapret/administrator";
import { CreateStudyService } from "./create-study.service";
import { UserType } from "@audapret/administrator";
import { ModalService } from "@audapret/shared";
import { AddUserModalComponent } from "./add-user-modal/add-user-modal.component";

@Component({
  selector: "audapret-study",
  templateUrl: "./create-study.component.html",
  styleUrls: ["./create-study.component.css"],
})
export class CreateStudyComponent {
  constructor(
    private readonly studyService: CreateStudyService,
    private readonly modalService: ModalService
  ) {}

  title = "study-administrator-client";
  users: StudyUserDto[] = [];
  studies: StudyDto[] = [];
  roles: UserType[] = [UserType.PARTICIPANT, UserType.RESEARCHER];
  createStudy(studyForm) {
    const studyDto: StudyDto = {
      studyTitle: studyForm.title,
      users: this.users,
    };
    console.log(this.users);
    const studyObs = this.studyService.createStudy(studyDto);
    studyObs.subscribe((sth) => console.log("created!"));
  }
  addUser(userDto: StudyUserDto) {
    this.users.push(userDto);
  }
  getStudies() {
    const studiesObs = this.studyService.getStudies();
    studiesObs.subscribe((studies) => (this.studies = <StudyDto[]>studies));
  }
  openAddUserModal() {
    this.modalService.init(AddUserModalComponent, {}, {});
  }
  /* openEditUserModal(user: UserDto) {
    this.modalService.init(EditUserModalComponent, { userToEdit: user }, {});
  } */
}
