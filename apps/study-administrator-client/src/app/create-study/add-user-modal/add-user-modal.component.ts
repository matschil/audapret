import { Component } from "@angular/core";

import { ModalService } from "@audapret/shared";
import { DetailLevel } from "@audapret/shared";
import { CreateStudyService } from "../create-study.service";
import { StudyUserDto, UserType } from "@audapret/administrator";
import { CreateStudyComponent } from "../create-study.component";

@Component({
  selector: "add-user-modal",
  templateUrl: "./add-user-modal.html",
  styleUrls: ["./add-user-modal.css"],
})
export class AddUserModalComponent {
  constructor(
    private readonly modalService: ModalService,
    private readonly createStudyService: CreateStudyService
  ) {}
  roles: UserType[] = [UserType.PARTICIPANT, UserType.RESEARCHER];

  public close() {
    this.modalService.destroy();
  }
  addUser(user: StudyUserDto) {
    this.createStudyService.addUser(user);
  }
}
