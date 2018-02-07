import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ChoresService } from "./chores/chores.service";
import { AppRouterModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { HeaderModule } from './header/header.module';
import { HomeModule } from "./home/home.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRouterModule,  
    HeaderModule,
    HomeModule,
    SharedModule
  ],
  providers: [ChoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
