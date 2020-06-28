import { Component, OnInit } from "@angular/core";
import { StudyDto } from "@audapret/administrator";
import { RequestStudyDataService } from "./request-study-data.service";
import { StudyUserDto } from "@audapret/administrator";
import {
  AdapterDataDto,
  getJsonTable,
  tablifyJson,
  getJsonTableRows,
  getJsonTableColumns,
} from "@audapret/shared";

@Component({
  selector: "audapret-data-loader",
  templateUrl: "./request-study-data.component.html",
  styleUrls: ["./request-study-data.component.css"],
})
export class RequestStudyDataComponent implements OnInit {
  constructor(private readonly dataLoaderService: RequestStudyDataService) {}

  users: StudyUserDto[] = [];
  studies: StudyDto[] = [];
  tableInformations = [];
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
    const adapterDtosByDataSource = {};
    dataObservable.subscribe((adapterDataDtos: AdapterDataDto[]) => {
      // 1. Group adapterDataDtos by data source
      const dataSources = adapterDataDtos.map(
        (dataSource) => dataSource.source
      );
      for (const dataSource of dataSources) {
        const dataForSource = adapterDataDtos.filter(
          (adapterDataDto) => adapterDataDto.source === dataSource
        );
        adapterDtosByDataSource[dataSource] = dataForSource;
      }
      // 2. Create JSON Table for each group
      const tableInformations = [];
      for (const dataSource of Object.keys(adapterDtosByDataSource)) {
        if (dataSource === "fitbit/sleep") {
          console.log(adapterDtosByDataSource[dataSource]);
        }
        // Transform JSON into displayable table
        const dataTable = tablifyJson(
          adapterDtosByDataSource[dataSource].map(
            (adapterData) => adapterData.content
          )
        );
        const rows = getJsonTableRows(dataTable);
        const numberRows = rows.length;
        const columns = getJsonTableColumns(dataTable);
        tableInformations.push({
          rows,
          dataTable,
          numberRows,
          columns,
          dataSource,
        });
      }

      this.tableInformations = tableInformations;
    });
  }

  loadDataFromAllUsers() {
    const dataObservable = this.dataLoaderService.getDataForAllUsers();
    dataObservable.subscribe((adapterDataDtos: AdapterDataDto[]) => {
      //this = adapterDataDtos;
    });
  }
}
