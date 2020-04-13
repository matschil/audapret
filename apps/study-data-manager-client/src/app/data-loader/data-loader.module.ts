import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DataLoaderComponent } from './data-loader.component';
import { DataLoaderService } from './data-loader.service';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DataLoaderComponent],
  imports: [HttpClientModule, BrowserModule, FormsModule, RouterModule],
  providers: [DataLoaderService]
})
export class DataLoaderModule {}
