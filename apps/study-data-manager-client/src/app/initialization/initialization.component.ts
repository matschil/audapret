import { Component, OnInit } from '@angular/core';
import { InitializationService } from './initialization.service';
import { DetailLevel, InitializationPayloadDto } from '@audapret/shared';
import { owner } from '../../assets/config';
//import { readFileSync } from 'fs';

@Component({
  selector: 'audapret-init',
  templateUrl: './initialization.component.html'
})
export class InitializationComponent implements OnInit {
  constructor(private readonly initializationService: InitializationService) {}

  ngOnInit() {}

  initializeOwner() {
    const init: InitializationPayloadDto = {
      ownersName: owner
    };
    const obs = this.initializationService.postInitialization(init);
    obs.subscribe(obj => console.log(obj));
  }
}
