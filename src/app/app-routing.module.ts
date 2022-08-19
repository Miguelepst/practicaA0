import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiguelcodeComponent } from './pages/miguelcode/miguelcode.component';

const routes: Routes = [
  {path:'miguelcode',component: MiguelcodeComponent},
  { path: 'products', loadChildren: () => import('./pages/products/products.module').then(m => m.ProductsModule) },

  {path:'**', redirectTo: '', pathMatch:'full'}  // debe ir al final de todo el listado de rutas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
