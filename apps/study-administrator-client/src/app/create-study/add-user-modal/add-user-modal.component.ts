import { Component } from "@angular/core";

import { ModalService } from "@audapret/shared";
import { DetailLevel } from "@audapret/shared";
import { CreateStudyService } from "../create-study.service";
import { StudyUserDto } from "@audapret/administrator";

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
  detailLevels = [DetailLevel.DAILY_AGGREGATE, DetailLevel.FULL];

  public close() {
    this.modalService.destroy();
  }

  onSubmit(anyData: any) {
    // Create new Grant
    const studyUser: StudyUserDto = {
      name: anyData.studyDataManagerAddress,
      studyDataManagerAddress: anyData.studyDataManagerAddress,
      userType: anyData.userType,
    };
    const obs = this.createStudyService.createStudy(null);
    obs.subscribe((obj) => console.log(obj));
  }
}
