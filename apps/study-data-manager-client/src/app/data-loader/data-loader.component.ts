import { Component, OnInit } from "@angular/core";
import { DataLoaderService, JsonTable } from "./data-loader.service";
import { AdapterDataDto, DataSourceDto } from "@audapret/shared";

@Component({
  selector: "audapret-data-loader",
  templateUrl: "./data-loader.component.html",
  styleUrls: ["./data-loader.component.css"],
})
export class DataLoaderComponent implements OnInit {
  constructor(private readonly dataLoaderService: DataLoaderService) {}
  title = "study-data-manager-client";
  data$: AdapterDataDto[];
  dataSources$: string[];
  selectedDataSource: string;
  dataTable$: JsonTable;
  columns: string[];
  rows: string[][];
  numberRows: number;
  parse = JSON.parse;
  keys = Object.keys;

  ngOnInit() {
    const obsDataSources = this.dataLoaderService.fetchDataSources();
    obsDataSources.subscribe((sources) => {
      const dataSourceDtos = sources as DataSourceDto[];
      this.dataSources$ = dataSourceDtos.map(
        (dataSourceDto) => dataSourceDto.source
      );
    });
  }
  loadDataFromSource(source: string) {
    this.selectedDataSource = source;
    const obs = this.dataLoaderService.fetchData(source);
    obs.subscribe((sth) => {
      this.data$ = <AdapterDataDto[]>sth;
      console.log(this.data$.length);
      this.dataTable$ = this.dataLoaderService.tablifyJson(
        this.data$.map((data) => data.content)
      );
      // extract columns - limit to 15 columns
      this.columns = Object.keys(this.dataTable$).slice(0, 14);

      // determine number of rows
      this.rows = [];
      this.numberRows = this.dataTable$[this.columns[0]].length;
      // extract rows
      for (let rowIndex = 0; rowIndex < this.numberRows; rowIndex++) {
        const row: string[] = [];
        for (const column of this.columns) {
          row.push(this.dataTable$[column][rowIndex]);
        }
        this.rows.push(row);
      }
    });
  }

  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
}
