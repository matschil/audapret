import { Component, OnInit } from "@angular/core";
import { GrantService } from "./grant.service";
import {
  DetailLevel,
  GrantedAction,
  CreateGrantPayloadDto,
  GrantPayloadDto,
  UserDto,
} from "@audapret/shared";
import { ModalService } from "../modals/modal.service";
import { CreateGrantModalComponant } from "./create-grant-modal/create-grant-modal.component";
import { EditGrantModalComponant } from "./edit-grant-modal/edit-grant-modal.component";

import { map } from "rxjs/operators";

@Component({
  selector: "audapret-grant",
  templateUrl: "./grant.component.html",
  styleUrls: ["./grant.component.css"],
})
export class GrantComponent implements OnInit {
  constructor(
    private readonly grantService: GrantService,
    private readonly modalService: ModalService
  ) {}
  users: UserDto[] = [];

  ngOnInit() {
    const grantsObs$ = this.grantService.getUsers();

    grantsObs$.subscribe((users) => {
      this.users = users;

      console.log(this.users);
    });
  }

  openCreateGrantModal() {
    this.modalService.init(CreateGrantModalComponant, {}, {});
  }
  openEditGrantModal(user: UserDto) {
    this.modalService.init(EditGrantModalComponant, { userToEdit: user }, {});
  }
  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
}
