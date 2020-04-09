import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverviewComponent } from './overview.component';
import { OverviewService } from './overview.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [OverviewComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [OverviewService],
  bootstrap: [OverviewComponent]
})
export class OverviewModule {}
