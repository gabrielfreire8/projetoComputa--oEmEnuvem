import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Tela1Component } from './componentes/tela1/tela1.component';
import { Tela2Component } from './componentes/tela2/tela2.component';
import { Tela3Component } from './componentes/tela3/tela3.component';

@NgModule({
  declarations: [
    AppComponent,
    Tela1Component,
    Tela2Component,
    Tela3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
