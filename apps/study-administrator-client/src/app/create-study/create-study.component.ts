import { Component, OnInit } from "@angular/core";
import { StudyUserDto } from "@audapret/administrator";
import { StudyDto } from "@audapret/administrator";
import { CreateStudyService } from "./create-study.service";
import { UserType } from "@audapret/administrator";
import { ModalService } from "@audapret/shared";
import { AddUserModalComponent } from "./add-user-modal/add-user-modal.component";
import { catchError } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { Router } from "@angular/router";
import { EditUserModalComponent } from "./edit-user-modal/edit-user-modal.component";
@Component({
  selector: "audapret-study",
  templateUrl: "./create-study.component.html",
  styleUrls: ["./create-study.component.css"],
})
export class CreateStudyComponent implements OnInit {
  constructor(
    private readonly studyService: CreateStudyService,
    private readonly modalService: ModalService,
    private readonly router: Router
  ) {}

  title = "study-administrator-client";
  studies: StudyDto[] = [];
  roles: UserType[] = [UserType.PARTICIPANT, UserType.RESEARCHER];
  users: StudyUserDto[];

  ngOnInit() {
    this.users = this.studyService.getUsers();
  }

  createStudy(studyForm) {
    const studyDto: StudyDto = {
      studyTitle: studyForm.title,
      users: this.studyService.getUsers(),
    };

    try {
      const studyObservable = this.studyService.createStudy(studyDto).pipe(
        // Otherwiese show error and stay
        catchError((err) => {
          return this.errorHandler(err);
        })
      );
      studyObservable.subscribe((sth) => {
        // If creation was successful
        // 1. Reset users-array
        this.studyService.resetUsers();
        // 2. Redirect to Overview page
        this.router.navigate(["/overview"]);
      });
    } catch {
      console.log("ERROR");
    }
  }
  getStudies() {
    const studiesObservable = this.studyService.getStudies();
    studiesObservable.subscribe(
      (studies) => (this.studies = <StudyDto[]>studies)
    );
  }
  openAddUserModal() {
    this.modalService.init(AddUserModalComponent, {}, {});
  }
  openEditUserModal(user: StudyUserDto) {
    this.modalService.init(EditUserModalComponent, { userToEdit: user }, {});
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || "server error.");
  }
}
