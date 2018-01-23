import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        FlexLayoutModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        FlexLayoutModule
    ]
})
export class CustomMaterialModule {
    
}