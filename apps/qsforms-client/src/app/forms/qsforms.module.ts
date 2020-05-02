import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BloodmarkerComponent } from "./bloodmarker/bloodmarker.component";
import { SendFormDataService } from "./send-form-data.service";
import { HttpClientModule } from "@angular/common/http";
import { WellBeingComponent } from "./well-being/well-being.component";

@NgModule({
  declarations: [BloodmarkerComponent, WellBeingComponent],
  imports: [FormsModule, BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [SendFormDataService],
  bootstrap: [BloodmarkerComponent, WellBeingComponent],
})
export class QsFormsModule {}
