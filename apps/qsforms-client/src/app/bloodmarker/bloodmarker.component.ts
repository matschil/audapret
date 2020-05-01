import { Component, OnInit } from "@angular/core";
import { SendFormDataService } from "./send-form-data.service";

interface BloodmarkerFormInput {
  ketoneLevels: string;
}
@Component({
  selector: "audapret-bloodmarker",
  templateUrl: "./bloodmarker.component.html",
})
export class BloodmarkerComponent implements OnInit {
  constructor(private readonly sendFormDataService: SendFormDataService) {}

  ngOnInit() {}
  sendBloodmarkerFormData(bloodmarkerFormInput: BloodmarkerFormInput) {
    const dataObservable = this.sendFormDataService.sendData("abs");
  }
}
