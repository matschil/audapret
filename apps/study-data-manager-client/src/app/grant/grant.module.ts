import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GrantComponent } from "./grant.component";
import { GrantService } from "./grant.service";
import { ModalModule } from "@audapret/shared";
import { CreateGrantModalComponent } from "./create-grant-modal/create-grant-modal.component";
import { EditGrantModalComponent } from "./edit-grant-modal/edit-grant-modal.component";

@NgModule({
  declarations: [
    GrantComponent,
    CreateGrantModalComponent,
    EditGrantModalComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  entryComponents: [CreateGrantModalComponent, EditGrantModalComponent],

  providers: [GrantService],
})
export class GrantModule {}
