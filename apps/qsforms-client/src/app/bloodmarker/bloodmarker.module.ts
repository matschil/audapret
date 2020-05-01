import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BloodmarkerComponent } from "./bloodmarker.component";
import { SendFormDataService } from "./send-form-data.service";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [BloodmarkerComponent],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [SendFormDataService],
  bootstrap: [BloodmarkerComponent],
})
export class BloodmarkerModule {}
