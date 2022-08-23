import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiguelcodeComponent } from './miguelcode.component';


const routes: Routes = [{ path: '', component: MiguelcodeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiguelcodeRoutingModule { }
