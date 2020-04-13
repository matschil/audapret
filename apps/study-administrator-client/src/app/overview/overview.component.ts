import { Component, OnInit } from '@angular/core';
import { StudyDto } from '@audapret/administrator';
import { OverviewService } from './overview.service';

@Component({
  selector: 'audapret-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  constructor(private readonly overviewService: OverviewService) {}

  studies: StudyDto[] = [];

  ngOnInit() {
    const studiesObs = this.overviewService.getStudies();
    studiesObs.subscribe(studies => {
      this.studies = <StudyDto[]>studies;
      console.log(this.studies);
    });
  }

  extractResearcherNames(study: StudyDto) {
    return study.users
      .filter(user => user.userType === 'researcher')
      .map(researcher => researcher.name);
  }
  extractParticipantNames(study: StudyDto) {
    return study.users
      .filter(user => user.userType === 'participant')
      .map(participant => participant.name);
  }
}
