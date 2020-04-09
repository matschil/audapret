import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GrantComponent } from './grant.component';
import { GrantService } from './grant.service';

@NgModule({
  declarations: [GrantComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule],
  providers: [GrantService]
})
export class GrantModule {}
