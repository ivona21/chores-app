import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material.module';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { ChoreListComponent } from "./chores/chore-list/chore-list.component";
import { ChoresService } from "./chores/chores.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChoreListComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule
  ],
  providers: [ChoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
