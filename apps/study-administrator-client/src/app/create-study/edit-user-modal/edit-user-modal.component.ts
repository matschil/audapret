import { Component, OnInit } from "@angular/core";

import { ModalService } from "@audapret/shared";
import { DetailLevel, UserDto } from "@audapret/shared";
import { StudyDto, StudyUserDto } from "@audapret/administrator";
import { CreateStudyService } from "../create-study.service";

@Component({
  selector: "edit-user-modal",
  templateUrl: "./edit-user-modal.html",
  styleUrls: ["./edit-user-modal.css"],
})
export class EditUserModalComponent {
  userToEdit: StudyUserDto;
  detailLevels = DetailLevel;

  constructor(
    private readonly modalService: ModalService,
    private readonly createStudyService: CreateStudyService
  ) {
    this.userToEdit = this.modalService.getInputs().userToEdit;
  }

  public close() {
    this.modalService.destroy();
  }

  onSubmit(userToUpdate: StudyUserDto) {
    // Update user in list of users
    this.createStudyService.updateUser(userToUpdate);
  }
  removeUser() {
    // Remove user from list of users
    this.createStudyService.removeUser(this.userToEdit);
  }
}
