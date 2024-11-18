
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MenuInicialComponent } from './componentes/menuInicial/menuInicial.component';
import { CalendarioAtivComponent } from './componentes/calendarioAtiv/calendarioAtiv.component';

import { CriaAtivComponent } from './componentes/criaAtiv/criaAtiv.component';
import { CadastroUserComponent } from './componentes/cadastroUser/cadastroUser.component';
import { AprovaAtivComponent } from './componentes/aprovaAtiv/aprovaAtiv.component';


import { ForgetPasswordComponent } from './componentes/forget-password/forget-password.component';

import { PresencaListComponent } from './componentes/presencaList/presencaList.component';
import { PerfilUserComponent } from './componentes/perfilUser/perfilUser.component';







export const routes: Routes = [
  {
    path:"",
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:"login",
    component: LoginComponent
  },
  {
    path:"menuInicial",
    component: MenuInicialComponent
  },
  {
    path:"calendarioAtiv",
    component: CalendarioAtivComponent
  },
  {
    path:"perfilUser",
    component: PerfilUserComponent
  },
  {
    path:"criaAtiv",
    component: CriaAtivComponent
  },
  {
    path:"cadastroUser",
    component: CadastroUserComponent
  },
  {
    path:"aprovaAtiv",
    component: AprovaAtivComponent
  },
  {
    path:"presencaList",
    component: PresencaListComponent
  },
  {
    path: "ForgetPass",
    component: ForgetPasswordComponent
  }


];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule {}
