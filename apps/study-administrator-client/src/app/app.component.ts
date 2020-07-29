import { Component } from "@angular/core";
import { StudyDto } from "@audapret/administrator";

@Component({
  selector: "audapret-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "study-administrator-client";
  studies: StudyDto[] = [];

  setNavItemActive(event) {
    // Determine Element to set active
    const toSetActive = document.getElementById(event.target.id);
    // Remove active from all NavItems
    toSetActive.parentElement.childNodes.forEach((node) =>
      (node as HTMLElement).classList.remove("active")
    );
    // Set target element active
    toSetActive.classList.add("active");
  }
}
