

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Tela8Component } from "./componentes/tela8/tela8.component";
import { Tela1Component } from "./componentes/tela1/tela1.component";
import { Tela2Component } from "./componentes/tela2/tela2.component";
import { Tela3Component } from "./componentes/tela3/tela3.component";
import { Tela4Component } from "./componentes/tela4/tela4.component";
import { Tela5Component } from "./componentes/tela5/tela5.component";
import { Tela6Component } from "./componentes/tela6/tela6.component";
import { Tela7Component } from "./componentes/tela7/tela7.component";
import { HttpClientModule } from '@angular/common/http';
import { ForgetPassComponent } from './componentes/forget-pass/forget-pass.component';



@NgModule({
  declarations: [
    AppComponent,
    Tela1Component,
    Tela2Component,
    Tela3Component,
    Tela4Component,
    Tela5Component,
    Tela6Component,
    Tela7Component,
    Tela8Component,
    ForgetPassComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
