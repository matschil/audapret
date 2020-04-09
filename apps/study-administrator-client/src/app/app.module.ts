import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRouterModule } from './app.routes';
import { FormsModule } from '@angular/forms';
import { AdministerStudyModule } from './administer-study/administer-study.module';
import { OverviewModule } from './overview/overview.module';
import { RequestStudyDataModule } from './request-study-data/request-study-data.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRouterModule,
    BrowserModule,
    FormsModule,
    AdministerStudyModule,
    OverviewModule,
    RequestStudyDataModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
