import { Component, OnInit } from "@angular/core";
import { StudyDto } from "@audapret/administrator";
import { RequestStudyDataService } from "./request-study-data.service";
import { StudyUserDto } from "@audapret/administrator";
import { AdapterDataDto } from "@audapret/shared";

@Component({
  selector: "audapret-data-loader",
  templateUrl: "./request-study-data.component.html",
})
export class RequestStudyDataComponent implements OnInit {
  constructor(private readonly dataLoaderService: RequestStudyDataService) {}

  users: StudyUserDto[] = [];
  studies: StudyDto[] = [];
  currentContent: AdapterDataDto[];
  ngOnInit() {
    // Get all studies
    const studiesObs = this.dataLoaderService.getStudies();
    studiesObs.subscribe((studies) => {
      this.studies = <StudyDto[]>studies;

      // Flatten arrays of array of users and append it to users
      this.users = this.users.concat(
        ...this.studies.map((study) => study.users)
      );
    });
  }

  loadData(username: string) {
    const dataObservable = this.dataLoaderService.getData(username);
    dataObservable.subscribe((adapterDataDto: AdapterDataDto) => {
      this.currentContent = [adapterDataDto];
    });
  }

  loadDataFromAllUsers() {
    const dataObservable = this.dataLoaderService.getDataForAllUsers();
    dataObservable.subscribe((adapterDataDtos: AdapterDataDto[]) => {
      this.currentContent = adapterDataDtos;
    });
  }
}
