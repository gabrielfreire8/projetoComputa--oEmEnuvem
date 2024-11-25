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
  atividadesDoDia: { nome: string; cpf: string }[] = []; // Declarando atividadesDoDia como array de objetos
  diasComAtividade: string[] = [];

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
    const dataSelecionada = `${this.ano}-${(this.getNumeroMes(this.mes) + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    if (!Array.isArray(this.diasComAtividade)) {
      console.error('diasComAtividade não é um array válido');
      return false;  // Retorna false caso diasComAtividade não seja um array
    }
    return this.diasComAtividade.includes(dataSelecionada);
  }


  selecionarDia(dia: number): void {
    this.diaSelecionado = dia;
    this.buscarAtividadesDoDia(dia);
  }

  buscarDiasComAtividades(): void {
    this.http.get<{ presencas: any[] }>(`http://3.90.61.243/presenca/atividade/`)
      .subscribe({
        next: (res) => {
          // Garantir que é um array de strings
          if (Array.isArray(res.presencas)) {
            this.diasComAtividade = res.presencas.map(presenca => presenca.data);
          } else {
            this.diasComAtividade = [];  // Se não for um array, assegure-se de que seja um array vazio
          }
          console.log('Dias com atividades:', this.diasComAtividade);  // Verifique se isso é um array de strings
        },
        error: (err) => {
          console.error('Erro ao buscar dias com atividades:', err);
        }
      });
  }


  buscarAtividadesDoDia(dia: number): void {
    const dataSelecionada = `${this.ano}-${(this.getNumeroMes(this.mes) + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    this.http.get<{ presencas: any[] }>(`http://3.90.61.243/presenca/atividade/${dataSelecionada}`)
      .subscribe(
        (response) => {
          console.log('Atividades do dia:', response);
          this.atividadesDoDia = response.presencas.length > 0 ? response.presencas[0].participantes : [];
        },
        (error) => {
          console.error('Erro ao buscar atividades:', error);
          this.atividadesDoDia = [];  // Caso ocorra erro, inicie atividadesDoDia com um array vazio
        }
      );
  }

  getNumeroMes(mes: string): number {
    return this.meses.indexOf(mes);
  }
}
