import { Component } from '@angular/core';
import { Tela1Service } from './componentes/tela1/tela1.service';

interface atividadeObj {
  nome: string;
  tipo: string;
  descricao: string;
  data: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private tela1Service: Tela1Service) {}

  ngOnInit(): void {}
}
