import { Component } from '@angular/core';
import { Tela7Service } from './tela7.service';


@Component({
  selector: 'app-tela7',
  templateUrl: './tela7.component.html',
  styleUrls: ['./tela7.component.css']
})
export class Tela7Component {
  nomeAtividade: string = '';
  tipoAtividade: string = '';
  descricaoAtividade: string = '';
  diasCalen: number[] = [];
  mesAtual: string = 'Setembro';

  constructor(private tela7Service: Tela7Service) {
    this.atualizarDiasCalen();
  }

  atualizarDiasCalen() {
    this.diasCalen = Array.from({ length: 30 }, (_, i) => i + 1);
  }

  navegarMes(direcao: number) {
    // Lógica para navegar entre meses
    if (direcao === 1) {
      this.mesAtual = 'Outubro'; // Aqui você pode adicionar lógica para o próximo mês
    } else {
      this.mesAtual = 'Agosto'; // Aqui você pode adicionar lógica para o mês anterior
    }
  }

  selecionarDia(dia: number) {
    // Aqui você pode armazenar o dia selecionado para a atividade
    console.log(`Dia selecionado: ${dia}`);
  }

  enviarAtividade() {
    const novaAtividade = {
      nome: this.nomeAtividade,
      tipo: this.tipoAtividade,
      descricao: this.descricaoAtividade,
    };
    this.tela7Service.salvarAtividade(novaAtividade);
    this.nomeAtividade = '';
    this.tipoAtividade = '';
    this.descricaoAtividade = '';
    console.log('Atividade enviada:', novaAtividade);
  }
}
