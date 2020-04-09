import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from './data-loader.service';
import { AdapterDataDto, DataSourceDto } from '@audapret/shared';

@Component({
  selector: 'audapret-data-loader',
  templateUrl: './data-loader.component.html'
})
export class DataLoaderComponent implements OnInit {
  constructor(private readonly dataLoaderService: DataLoaderService) {}
  title = 'study-data-manager-client';
  data$: AdapterDataDto;
  dataSources$: String[];
  parse = JSON.parse;
  keys = Object.keys;

  ngOnInit() {
    /* const obsData = this.dataLoaderService.fetchData('oura/readiness');
    obsData.subscribe(sth => (this.data$ = <AdapterDataDto>sth));
 */
    const obsDataSources = this.dataLoaderService.fetchDataSources();
    obsDataSources.subscribe(sources => {
      const dataSourceDtos = sources as DataSourceDto[];
      this.dataSources$ = dataSourceDtos.map(
        dataSourceDto => dataSourceDto.source
      );
    });
  }
  loadDataFromSource(source: string) {
    const obs = this.dataLoaderService.fetchData(source);
    obs.subscribe(sth => (this.data$ = <AdapterDataDto>sth));
  }

  jsonTransform(object: object) {
    return JSON.stringify(object, null, '  ');
  }
}
