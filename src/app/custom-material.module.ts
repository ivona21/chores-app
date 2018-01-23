import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule        
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatTableModule,
        FlexLayoutModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class CustomMaterialModule {

}