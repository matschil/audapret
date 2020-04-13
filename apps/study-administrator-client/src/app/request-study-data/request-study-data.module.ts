import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RequestStudyDataComponent } from './request-study-data.component';
import { RequestStudyDataService } from './request-study-data.service';
import { HttpClientModule } from '@angular/common/http';
import { OverviewModule } from '../overview/overview.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RequestStudyDataComponent],
  imports: [BrowserModule, HttpClientModule, OverviewModule, FormsModule],
  providers: [RequestStudyDataService],
  bootstrap: [RequestStudyDataComponent]
})
export class RequestStudyDataModule {}
