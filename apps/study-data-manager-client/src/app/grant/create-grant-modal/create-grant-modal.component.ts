import { Component, OnInit } from "@angular/core";

import { ModalService } from "@audapret/shared";
import {
  DetailLevel,
  CreateGrantPayloadDto,
  GrantedAction,
} from "@audapret/shared";
import { GrantService } from "../grant.service";

@Component({
  selector: "create-grant-modal",
  templateUrl: "./create-grant-modal.html",
  styleUrls: ["./create-grant-modal.css"],
})
export class CreateGrantModalComponent {
  constructor(
    private readonly modalService: ModalService,
    private readonly grantService: GrantService
  ) {}
  detailLevels = [DetailLevel.DAILY_AGGREGATE, DetailLevel.FULL];

  public close() {
    this.modalService.destroy();
  }
  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
  onSubmit(anyData: any) {
    // Create new Grant
    const createGrantPayload: CreateGrantPayloadDto = {
      username: anyData.requester,
      grantedActions: [GrantedAction.READ],
      detailLevel: anyData.detailLevel,
    };
    const obs = this.grantService.postGrant(createGrantPayload);
    obs.subscribe((obj) => console.log(obj));
  }
}
