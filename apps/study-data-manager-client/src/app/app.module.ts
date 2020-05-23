import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRouterModule } from "./app.routes";
import { GrantModule } from "./grant/grant.module";
import { DataLoaderModule } from "./data-loader/data-loader.module";
import { InitializationModule } from "./initialization/initialization.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginModule } from "./login/login.module";
import { AlertComponent } from "./alert/alert.component";

@NgModule({
  declarations: [AppComponent, AlertComponent],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRouterModule,
    GrantModule,
    DataLoaderModule,
    InitializationModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
