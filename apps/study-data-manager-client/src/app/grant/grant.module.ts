import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GrantComponent } from "./grant.component";
import { GrantService } from "./grant.service";
import { ModalModule } from "../modals/modal.module";
import { CreateGrantModalComponant } from "./create-grant-modal/create-grant-modal.component";

@NgModule({
  declarations: [GrantComponent, CreateGrantModalComponant],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
  ],
  entryComponents: [CreateGrantModalComponant],

  providers: [GrantService],
})
export class GrantModule {}
