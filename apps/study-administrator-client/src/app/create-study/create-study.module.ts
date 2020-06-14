import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CreateStudyComponent } from "./create-study.component";
import { CreateStudyService } from "./create-study.service";
import { HttpClientModule } from "@angular/common/http";
import { AddUserModalComponent } from "./add-user-modal/add-user-modal.component";
import { ModalModule } from "@audapret/shared";
import { EditUserModalComponent } from "./edit-user-modal/edit-user-modal.component";

@NgModule({
  declarations: [
    CreateStudyComponent,
    AddUserModalComponent,
    EditUserModalComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  providers: [CreateStudyService],
  bootstrap: [CreateStudyComponent],
  entryComponents: [AddUserModalComponent, EditUserModalComponent],
})
export class CreateStudyModule {}
