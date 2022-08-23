import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/app.material.modulo';
import { MiguelcodeComponent } from './miguelcode.component';
import { MiguelcodeRoutingModule } from './miguelcode-routing.module';

@NgModule({
  declarations: [
    MiguelcodeComponent
    
  ],
  imports: [
    CommonModule,
    MiguelcodeRoutingModule,
    MaterialModule
  ]
})
export class MiguelcodeModule { }
