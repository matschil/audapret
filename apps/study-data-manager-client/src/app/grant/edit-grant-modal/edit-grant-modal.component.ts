import { Component, OnInit } from "@angular/core";

import { ModalService } from "../../modals/modal.service";
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
    this.userToEdit = this.modalService.getComponentConfig().inputs;
  }

  detailLevels = [DetailLevel.DAILY_AGGREGATE, DetailLevel.FULL];

  public close() {
    this.modalService.destroy();
  }
  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
  onSubmit(anyData: any) {
    // Update existing grant
    const updateGrantPayload: UpdateGrantPayloadDto = {
      username: anyData.requester,
      grantedActions: [GrantedAction.READ],
      detailLevel: anyData.detailLevel,
    };
    const obs = this.grantService.putGrant(updateGrantPayload);
    obs.subscribe((obj) => console.log(obj));
  }
}
