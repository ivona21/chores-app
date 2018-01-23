import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CustomMaterialModule } from './custom-material.module';
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from './home/home.component';
import { ChoresComponent } from "./chores/chores.component";
import { ChoreListComponent } from "./chores/chore-list/chore-list.component";
import { AddChoreComponent } from "./chores/add-chore/add-chore.component";
import { EditChoreComponent } from "./chores/edit-chore/edit-chore.component";
import { ChoresService } from "./chores/chores.service";
import { AppRouterModule } from "./app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ChoresComponent,
    ChoreListComponent,
    AddChoreComponent,
    EditChoreComponent
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
