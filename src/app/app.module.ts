import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material.module';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { ChoreListComponent } from "./chores/chores-management/chore-list.component";
import { ChoresService } from "./chores/chores.service";
import { AppRouterModule } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChoreListComponent
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    AppRouterModule
  ],
  providers: [ChoresService],
  bootstrap: [AppComponent]
})
export class AppModule { }
