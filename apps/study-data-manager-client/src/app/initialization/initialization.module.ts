import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InitializationComponent } from './initialization.component';
import { InitializationService } from './initialization.service';

@NgModule({
  declarations: [InitializationComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule],
  providers: [InitializationService]
})
export class InitializationModule {}
