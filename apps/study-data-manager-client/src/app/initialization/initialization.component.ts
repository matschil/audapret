import { Component, OnInit } from "@angular/core";
import { InitializationService } from "./initialization.service";
import { owner } from "../../assets/config";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first, tap } from "rxjs/operators";
import { AlertService } from "@audapret/shared";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "audapret-init",
  templateUrl: "./initialization.component.html",
  styleUrls: ["./initialization.component.css"],
})
export class InitializationComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private readonly initializationService: InitializationService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    //private authenticationService: AuthenticationService,
    private readonly alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (false /* this.authenticationService.currentUserValue */) {
      // Todo: Outsource view data page path to use globally
      this.router.navigate(["/"]);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.initializationService
      .initializeServer(this.registerForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.alertService.success("Registration successful", true);
          this.router.navigate(["/login"]);
        },
        (error: HttpErrorResponse) => {
          console.log("cought error");
          this.alertService.error(error.statusText);
          this.loading = false;
        }
      );
  }
}
