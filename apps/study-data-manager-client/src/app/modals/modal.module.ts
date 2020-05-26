import { NgModule } from "@angular/core";
import { ModalService } from "./modal.service";
import { CreateGrantModalComponant } from "../grant/create-grant-modal/create-grant-modal.component";
import { DomService } from "./dom.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [],
  providers: [ModalService, DomService],
})
export class ModalModule {}
