import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { AppRouterModule } from "./app.routes";
import { FormsModule } from "@angular/forms";
import { CreateStudyModule } from "./create-study/create-study.module";
import { OverviewModule } from "./overview/overview.module";
import { RequestStudyDataModule } from "./request-study-data/request-study-data.module";
import { ModalModule } from "@audapret/shared";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRouterModule,
    BrowserModule,
    FormsModule,
    CreateStudyModule,
    OverviewModule,
    RequestStudyDataModule,
    ModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
