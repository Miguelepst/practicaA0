import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/componentes/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MiguelcodeComponent } from './pages/miguelcode/miguelcode.component';
import {HttpClientModule} from '@angular/common/http';
import { MaterialModule } from 'src/app/material.modulo';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MiguelcodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
