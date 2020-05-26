import { Component, OnInit } from "@angular/core";
import { GrantService } from "./grant.service";
import {
  DetailLevel,
  GrantedAction,
  CreateGrantPayloadDto,
} from "@audapret/shared";

@Component({
  selector: "audapret-grant",
  templateUrl: "./grant.component.html",
})
export class GrantComponent implements OnInit {
  constructor(private readonly grantService: GrantService) {}
  detailLevels = [DetailLevel.DAILY_AGGREGATE, DetailLevel.FULL];

  ngOnInit() {}

  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
  onSubmit(anyData: any) {
    const createGrantPayload: CreateGrantPayloadDto = {
      username: anyData.requester,
      grantedActions: [GrantedAction.READ],
      detailLevel: anyData.detailLevel,
    };
    const obs = this.grantService.postGrant(createGrantPayload);
    obs.subscribe((obj) => console.log(obj));
    //console.log(anyData);
  }
}
