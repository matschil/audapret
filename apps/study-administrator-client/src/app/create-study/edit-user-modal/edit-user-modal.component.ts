import { Component, OnInit } from "@angular/core";

import { ModalService } from "@audapret/shared";
import { DetailLevel, UserDto } from "@audapret/shared";

@Component({
  selector: "edit-user-modal",
  templateUrl: "./edit-user-modal.html",
  styleUrls: ["./edit-user-modal.css"],
})
export class EditUserModalComponent {
  userToEdit: UserDto;
  constructor(private readonly modalService: ModalService) {
    this.userToEdit = this.modalService.getInputs().userToEdit;
  }

  public close() {
    this.modalService.destroy();
  }

  onSubmit() {
    // Update user in list of users
  }
}
