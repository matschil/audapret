import { Component, OnInit } from "@angular/core";
import { SendFormDataService } from "../send-form-data.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "audapret-well-being",
  templateUrl: "./well-being.component.html",
})
export class WellBeingComponent implements OnInit {
  wellBeingForm = this.formBuilder.group({
    SubjectiveSleepRating: [""],
    FocusEvening: [""],
  });

  ngOnInit() {}
  async onSubmit() {
    this.sendFormDataService
      .sendData(this.wellBeingForm.value, "well-being")
      .subscribe((response) => console.log(response));
  }
  constructor(
    private formBuilder: FormBuilder,
    private sendFormDataService: SendFormDataService
  ) {}
}
//
/* export class BloodmarkerComponent implements OnInit {
  constructor(private readonly sendFormDataService: SendFormDataService) {}
  favoriteColorControl = new FormControl("");
  ngOnInit() {}
  sendBloodmarkerFormData(bloodmarkerFormInput: BloodmarkerFormInput) {
    const dataObservable = this.sendFormDataService.sendData("abs");
  }
} */
