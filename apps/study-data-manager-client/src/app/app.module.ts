import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRouterModule } from './app.routes';
import { GrantModule } from './grant/grant.module';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { InitializationModule } from './initialization/initialization.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRouterModule,
    GrantModule,
    DataLoaderModule,
    InitializationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
