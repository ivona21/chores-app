import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material.module';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { ChoresService } from "./chores/chores.service";
import { AppRouterModule } from "./app-routing.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { HttpModule } from '@angular/http';
import { ConfirmDialogComponent } from './shared/dialogs/confirmDialog/confirm-dialog.component';
import { ChoresModule } from './chores/chores.module';


@NgModule({
  entryComponents: [
    ConfirmDialogComponent
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,   
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    CustomMaterialModule,
    AppRouterModule,
    ChoresModule
  ],
  providers: [ChoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
