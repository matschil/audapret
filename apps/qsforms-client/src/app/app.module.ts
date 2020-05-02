import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRouterModule } from "./app.routes";
import { QsFormsModule } from "./forms/qsforms.module";
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    BrowserModule,
    QsFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
