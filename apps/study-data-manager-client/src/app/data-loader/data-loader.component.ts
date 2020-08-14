import { Component, OnInit } from "@angular/core";
import { DataLoaderService } from "./data-loader.service";
import * as delay from "delay";
import {
  AdapterDataDto,
  DataSourceDto,
  JsonTable,
  getJsonTableRows,
  tablifyJson,
  getJsonTableColumns,
} from "@audapret/shared";

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
    const grantObservable = this.dataLoaderService.fetchData(source);
    grantObservable.subscribe((sth) => {
      this.data$ = <AdapterDataDto[]>sth;
      this.data$.reverse();
      console.log(this.data$);
      // Only for presentation: Remove afterwards
      if (source === "netatmo/indoor") {
        this.dataTable$ = tablifyJson(
          this.data$.map((data) => data.content["value"])
        );
      }
      // Transform JSON into displayable table
      this.dataTable$ = tablifyJson(this.data$.map((data) => data.content));
      this.rows = getJsonTableRows(this.dataTable$);
      this.numberRows = this.rows.length;
      this.columns = getJsonTableColumns(this.dataTable$);

      // Scroll down in case table is too large
      this.scrollToTable();
    });
  }

  updateButtonText(event) {
    const toSetActive = document.getElementById(event.target.id);
    document.getElementById("dropdownMenuButton").textContent =
      toSetActive.textContent;
  }

  async scrollToTable() {
    await delay(10);

    window.scrollBy({ top: 100, behavior: "smooth" });
  }

  jsonTransform(object: object) {
    return JSON.stringify(object, null, "  ");
  }
}
