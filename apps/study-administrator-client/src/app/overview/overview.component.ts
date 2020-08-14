import { Component, OnInit } from "@angular/core";
import { StudyDto, UserType } from "@audapret/administrator";
import { OverviewService } from "./overview.service";

@Component({
  selector: "audapret-overview",
  templateUrl: "./overview.component.html",
  styleUrls: ["./overview.component.css"],
})
export class OverviewComponent implements OnInit {
  constructor(private readonly overviewService: OverviewService) {}

  studies: StudyDto[] = [];

  ngOnInit() {
    const studiesObservable = this.overviewService.getStudies();
    studiesObservable.subscribe((studies) => {
      this.studies = <StudyDto[]>studies;
    });
  }

  extractResearcherNames(study: StudyDto): String {
    return study.users
      .filter((user) => user.userType === UserType.RESEARCHER)
      .map((researcher) => researcher.name)
      .toString();
  }
  extractParticipantNames(study: StudyDto): String {
    return study.users
      .filter((user) => user.userType === UserType.PARTICIPANT)
      .map((participant) => participant.name)
      .toString();
  }
}
