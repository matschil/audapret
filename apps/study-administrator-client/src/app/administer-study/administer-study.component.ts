import { Component } from '@angular/core';
import { UserDto } from '@audapret/administrator';
import { StudyDto } from '@audapret/administrator';
import { AdministerStudyService } from './administer-study.service';
import { UserType } from '@audapret/administrator';

@Component({
  selector: 'audapret-study',
  templateUrl: './administer-study.component.html'
})
export class AdministerStudyComponent {
  constructor(private readonly studyService: AdministerStudyService) {}

  title = 'study-administrator-client';
  users: UserDto[] = [];
  studies: StudyDto[] = [];
  roles: UserType[] = [UserType.PARTICIPANT, UserType.RESEARCHER];
  createStudy(studyForm) {
    const studyDto: StudyDto = {
      studyTitle: studyForm.title,
      users: this.users
    };
    console.log(this.users);
    const studyObs = this.studyService.createStudy(studyDto);
    studyObs.subscribe(sth => console.log('created!'));
  }
  addUser(userDto: UserDto) {
    this.users.push(userDto);
  }
  getStudies() {
    const studiesObs = this.studyService.getStudies();
    studiesObs.subscribe(studies => (this.studies = <StudyDto[]>studies));
  }
  test() {}
}
