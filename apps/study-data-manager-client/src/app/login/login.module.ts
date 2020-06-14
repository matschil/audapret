import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AlertService } from "@audapret/shared";
import { LoginComponent } from "./login.component";
import { AuthenticationService } from "./authentication.service";

@NgModule({
  declarations: [LoginComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule, ReactiveFormsModule],
  providers: [AlertService, AuthenticationService],
})
export class LoginModule {}
