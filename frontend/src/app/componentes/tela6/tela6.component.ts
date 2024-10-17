import { Component, OnInit } from '@angular/core';
import { Tela6Service } from './tela6.service';


@Component({
  selector: 'app-tela6',
  templateUrl: './tela6.component.html',
  styleUrls: ['./tela6.component.css']
})
export class Tela6Component implements OnInit {
  atividades: { nome: string; tipo: string; descricao: string; data: string }[] = [];

  constructor(private tela6Service: Tela6Service) {}

  ngOnInit(): void {
    this.obterAtividades();
  }

  obterAtividades() {
    this.tela6Service.getAtividades().subscribe((atividades: { nome: string; tipo: string; descricao: string; data: string; }[]) => {
      this.atividades = atividades;
    });
  }

  aprovarAtividade(atividade: any) {
    console.log(`Aprovada: ${atividade.nome}`);
    // Aqui você pode chamar um serviço para atualizar o status da atividade
  }

  rejeitarAtividade(atividade: any) {
    console.log(`Rejeitada: ${atividade.nome}`);
    // Aqui você pode chamar um serviço para remover ou atualizar a atividade
  }
}
