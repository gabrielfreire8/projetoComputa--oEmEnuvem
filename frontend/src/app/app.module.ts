import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { Tela1Component } from './componentes/tela1/tela1.component';
import { Tela2Component } from './componentes/tela2/tela2.component';
import { Tela3Component } from './componentes/tela3/tela3.component';
import { Tela7Component } from './componentes/tela7/tela7.component';
import { Tela6Component } from './componentes/tela6/tela6.component';
import { Tela4Component } from './componentes/tela4/tela4.component';
import { Tela5Component } from './componentes/tela5/tela5.component';
import { Tela8Component } from './componentes/tela8/tela8.component';
import { PrimaryInputComponent } from './componentes/primary-input/primary-input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [

    Tela2Component,
    Tela3Component,
    Tela6Component,
    Tela7Component,
    Tela4Component,
    Tela5Component,
    Tela8Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
