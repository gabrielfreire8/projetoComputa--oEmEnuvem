import { Component } from '@angular/core';
import { Tela1Service } from './componentes/tela1/tela1.service';



interface atividadeObj {
  nome: string
  tipo: string
  descricao: string
  data:string
}

import atividade from '../../../backend/src/models/atividadesModel'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {






  constructor(private tela1Service: Tela1Service) {}
  ngOnInit(): void{




}




}
