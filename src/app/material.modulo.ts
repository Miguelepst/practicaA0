import { NgModule } from "@angular/core";
import{MatToolbarModule} from "@angular/material/toolbar";
import{MatCardModule} from "@angular/material/card";
import{MatButtonModule} from "@angular/material/button";
import{MatIconModule} from "@angular/material/icon";
import { MatRadioModule } from "@angular/material/radio";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    exports : [MatToolbarModule,
        MatCardModule, 
        MatButtonModule, 
        MatIconModule,
        MatRadioModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule
        
    ]
})


export class MaterialModule{    }