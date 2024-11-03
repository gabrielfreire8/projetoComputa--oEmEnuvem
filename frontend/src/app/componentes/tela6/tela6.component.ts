import { Component, OnInit } from '@angular/core';

import { Atividade } from './atividade.model'; // Certifique-se de que esse caminho está correto
import { AtividadeService } from './service.atividade';

@Component({
  selector: 'app-tela6',
  templateUrl: './tela6.component.html',
  styleUrls: ['./tela6.component.css']
})
export class Tela6Component implements OnInit {
  atividades: Atividade[] = []; // Lista de atividades

  constructor(private atividadeService: AtividadeService) {}

  ngOnInit() {
    // Inscreva-se para obter as atividades
    this.atividadeService.atividades$.subscribe((atividades: Atividade[]) => {
      this.atividades = atividades; // Atualiza a lista de atividades
    });
  }

  aprovarAtividade(atividade: Atividade) {
    console.log('Aprovada:', atividade);
    this.atividadeService.aprovarAtividade(atividade).subscribe(() => {
      this.atividades = this.atividades.filter(a => a !== atividade); // Remove a atividade da lista
    });
  }

  rejeitarAtividade(atividade: Atividade) {
    console.log('Rejeitada:', atividade);
    this.atividadeService.rejeitarAtividade(atividade).subscribe(() => {
      this.atividades = this.atividades.filter(a => a !== atividade); // Remove a atividade da lista
    });
  }
}
