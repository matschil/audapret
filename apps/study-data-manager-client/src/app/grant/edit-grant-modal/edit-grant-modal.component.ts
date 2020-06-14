import { Component, OnInit } from "@angular/core";

import { ModalService } from "@audapret/shared";
import {
  DetailLevel,
  GrantedAction,
  UpdateGrantPayloadDto,
  UserDto,
} from "@audapret/shared";
import { GrantService } from "../grant.service";

@Component({
  selector: "edit-grant-modal",
  templateUrl: "./edit-grant-modal.html",
  styleUrls: ["./edit-grant-modal.css"],
})
export class EditGrantModalComponant {
  userToEdit: UserDto;
  constructor(
    private readonly modalService: ModalService,
    private readonly grantService: GrantService
  ) {
    this.userToEdit = this.modalService.getInputs().userToEdit;
  }

  detailLevels = [DetailLevel.DAILY_AGGREGATE, DetailLevel.FULL];

  public close() {
    this.modalService.destroy();
  }
  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
  onSubmit() {
    // Update existing grant
    const updateGrantPayload: UpdateGrantPayloadDto = {
      username: this.userToEdit.username,
      grantedActions: [GrantedAction.READ],
      detailLevel: this.userToEdit.grant.detailLevel,
    };
    console.log(updateGrantPayload);
    const obs = this.grantService.putGrant(updateGrantPayload);
    obs.subscribe((obj) => console.log(obj));
  }
}
