import { Component, OnInit } from "@angular/core";
import { AdapterDataDto, UserDto } from "@audapret/shared";
import { Router } from "@angular/router";
import { AuthenticationService } from "./login/authentication.service";

@Component({
  selector: "audapret-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  currentUser: UserDto;
  title = "study-data-manager-client";
  data$: AdapterDataDto;
  parse = JSON.parse;
  keys = Object.keys;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  ngOnInit() {}
}
