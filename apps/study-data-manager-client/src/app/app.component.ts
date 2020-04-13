import { Component, OnInit } from '@angular/core';
import { AdapterDataDto } from '@audapret/shared';

@Component({
  selector: 'audapret-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}
  title = 'study-data-manager-client';
  data$: AdapterDataDto;
  parse = JSON.parse;
  keys = Object.keys;

  ngOnInit() {}
}
