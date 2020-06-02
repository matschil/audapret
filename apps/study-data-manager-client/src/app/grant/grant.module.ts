import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GrantComponent } from "./grant.component";
import { GrantService } from "./grant.service";
import { ModalModule } from "../modals/modal.module";
import { CreateGrantModalComponant } from "./create-grant-modal/create-grant-modal.component";
import { EditGrantModalComponant } from "./edit-grant-modal/edit-grant-modal.component";

@NgModule({
  declarations: [
    GrantComponent,
    CreateGrantModalComponant,
    EditGrantModalComponant,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  entryComponents: [CreateGrantModalComponant, EditGrantModalComponant],

  providers: [GrantService],
})
export class GrantModule {}
