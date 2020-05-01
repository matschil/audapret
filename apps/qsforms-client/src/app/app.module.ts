import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { AppRouterModule } from "./app.routes";
import { BloodmarkerModule } from "./bloodmarker/bloodmarker.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    BrowserModule,
    BloodmarkerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
