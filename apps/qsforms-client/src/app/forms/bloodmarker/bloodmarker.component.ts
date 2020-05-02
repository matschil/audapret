import { Component, OnInit } from "@angular/core";
import { SendFormDataService } from "../send-form-data.service";
import { FormBuilder, Validators } from "@angular/forms";

interface BloodmarkerFormInput {
  ketoneLevels: string;
  bloodSugar: string;
}
@Component({
  selector: "audapret-bloodmarker",
  templateUrl: "./bloodmarker.component.html",
})
export class BloodmarkerComponent implements OnInit {
  bloodmarkerForm = this.formBuilder.group({
    ketoneLevels: ["", Validators.required],
    bloodSugar: ["", Validators.minLength(3)],
  });

  ngOnInit() {}
  async onSubmit() {
    this.sendFormDataService
      .sendData(this.bloodmarkerForm.value, "bloodmarker")
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
