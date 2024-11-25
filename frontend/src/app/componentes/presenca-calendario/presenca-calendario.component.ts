import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-presenca-calendario',
  templateUrl: './presenca-calendario.component.html',
  styleUrls: ['./presenca-calendario.component.css']
})
export class PresencaCalendarioComponent implements OnInit {
  mes: string;
  ano: number;
  dias: { dia: number; comAtividade: boolean }[] = [];
  diaSelecionado: number | null = null;
  atividadesDoDia: { nome: string; cpf: string; data: string }[] = [];
  diasComAtividade: number[] = [];

  meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private http: HttpClient) {
    const hoje = new Date();
    this.mes = this.meses[hoje.getMonth()];
    this.ano = hoje.getFullYear();
  }

  ngOnInit(): void {
    this.carregarCalendario();
    this.buscarDiasComAtividades();
  }

  carregarCalendario(): void {
    const numeroMes = this.getNumeroMes(this.mes);
    const ultimoDia = new Date(this.ano, numeroMes + 1, 0).getDate();
    this.dias = Array.from({ length: ultimoDia }, (_, i) => ({
      dia: i + 1,
      comAtividade: false
    }));
    this.buscarDiasComAtividades();
  }

  mudarMes(direcao: number): void {
    let indexAtual = this.meses.indexOf(this.mes);
    let novoIndex = indexAtual + direcao;

    if (novoIndex < 0) {
      novoIndex = 11;
      this.ano--;
    } else if (novoIndex > 11) {
      novoIndex = 0;
      this.ano++;
    }

    this.mes = this.meses[novoIndex];
    this.carregarCalendario();
    this.buscarDiasComAtividades();
  }

  temAtividade(dia: number): boolean {
    return this.diasComAtividade.includes(dia);
  }

  selecionarDia(dia: number): void {
    this.diaSelecionado = dia;
    this.buscarAtividadesDoDia(dia);
  }

  buscarDiasComAtividades(): void {
    const mesAtual = this.getNumeroMes(this.mes) + 1;
    const anoAtual = this.ano;

    this.http.get<number[]>(`http://3.90.61.243/presenca/atividade/`)
      .subscribe({
        next: (res) => {
          this.diasComAtividade = res;
          console.log('Dias com atividades:', this.diasComAtividade);
          this.buscarDiasComAtividades();
        },
        error: (err) => {
          console.error('Erro ao buscar dias com atividades:', err);
        }
      });
  }

  buscarAtividadesDoDia(dia: number): void {
    const mesAtual = this.getNumeroMes(this.mes) + 1;
    const anoAtual = this.ano;
    const dataSelecionada = `${anoAtual}-${mesAtual.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;

    this.http.get<{ nome: string; cpf: string; data: string }[]>(`http://3.90.61.243/presenca/atividades/`)
      .subscribe(
        (response) => {
          console.log('Atividades do dia:', response);
          this.atividadesDoDia = response;
        },
        (error) => {
          console.error('Erro ao buscar atividades:', error);
        }
      );
  }

  getNumeroMes(mes: string): number {
    return this.meses.indexOf(mes);
  }
}
