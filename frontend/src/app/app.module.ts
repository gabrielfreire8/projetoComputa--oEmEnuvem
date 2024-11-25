import { CalendarioAtivComponent } from './componentes/calendarioAtiv/calendarioAtiv.component';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AprovaAtivComponent } from './componentes/aprovaAtiv/aprovaAtiv.component';
import { CadastroUserComponent } from './componentes/cadastroUser/cadastroUser.component';
import { LoginComponent } from './componentes/login/login.component';
import { MenuInicialComponent } from './componentes/menuInicial/menuInicial.component';

import { PresencaListComponent } from './componentes/presencaList/presencaList.component';
import { ForgetPasswordComponent } from './componentes/forget-password/forget-password.component';
import { PerfilUserComponent } from './componentes/perfilUser/perfilUser.component';
import { CriaAtivComponent } from './componentes/criaAtiv/criaAtiv.component';
import { PresencaCalendarioComponent } from './componentes/presenca-calendario/presenca-calendario.component';





@NgModule({
  declarations: [
    AppComponent,
    AprovaAtivComponent,
    CadastroUserComponent,
    CalendarioAtivComponent,
    CriaAtivComponent,
    LoginComponent,
    MenuInicialComponent,
    PerfilUserComponent,
    PresencaListComponent,
    ForgetPasswordComponent,
    PresencaCalendarioComponent


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
