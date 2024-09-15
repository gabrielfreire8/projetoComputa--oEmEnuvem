import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tela1Component } from './componentes/tela1/tela1.component';
import { Tela2Component } from './componentes/tela2/tela2.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:'tela1',
    pathMatch:'full'
  },
  {
    path:"tela1",
    component: Tela1Component
  },
  {
    path:"tela2",
    component: Tela2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }