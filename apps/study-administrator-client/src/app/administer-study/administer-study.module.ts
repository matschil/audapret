import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdministerStudyComponent } from './administer-study.component';
import { AdministerStudyService } from './administer-study.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AdministerStudyComponent],
  imports: [FormsModule, BrowserModule, HttpClientModule],
  providers: [AdministerStudyService],
  bootstrap: [AdministerStudyComponent]
})
export class AdministerStudyModule {}
