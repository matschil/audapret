import { Component } from '@angular/core';
import { StudyDto } from '@audapret/administrator';

@Component({
  selector: 'audapret-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'study-administrator-client';
  studies: StudyDto[] = [];
}
