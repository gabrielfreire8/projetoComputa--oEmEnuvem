import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-presenca-calendario',
  templateUrl: './presenca-calendario.component.html',
  styleUrls: ['./presenca-calendario.component.css']
})
export class PresencaCalendarioComponent implements OnInit {


  private apiUrl = environment.apiUrl;

  mes: string;
  ano: number;
  dias: { dia: number; comAtividade: boolean }[] = [];
  diaSelecionado: number | null = null;
  atividadesDoDia: { nome: string; cpf: string }[] = [];
  diasComAtividade: string[] = [];
  erroCarregamento: boolean = false;
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
  }

  temAtividade(dia: number): boolean {
    const dataSelecionada = `${this.ano}-${(this.getNumeroMes(this.mes) + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    if (Array.isArray(this.diasComAtividade)) {
      return this.diasComAtividade.includes(dataSelecionada);
    }
    console.error('diasComAtividade não é um array válido:', this.diasComAtividade);
    return false;
  }

  selecionarDia(dia: number): void {
    this.diaSelecionado = dia;
    this.buscarAtividadesDoDia(dia);
  }

  buscarDiasComAtividades(): void {
    this.http.get<{ presencas: any[] }>(`${this.apiUrl}/presenca/atividade/`)
      .subscribe({
        next: (res) => {
          this.diasComAtividade = Array.isArray(res.presencas)
            ? res.presencas.map(presenca => presenca.data)
            : [];
          this.erroCarregamento = false;
        },
        error: (err) => {
          console.error('Erro ao buscar dias com atividades:', err);
          this.erroCarregamento = true;
          this.diasComAtividade = [];
        }
      });
  }

  buscarAtividadesDoDia(dia: number): void {
    const dataSelecionada = `${this.ano}-${(this.getNumeroMes(this.mes) + 1).toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    this.http.get<{ presencas: any[] }>(`${this.apiUrl}/presenca/atividade`)
      .subscribe({
        next: (response) => {
          this.atividadesDoDia = Array.isArray(response.presencas) && response.presencas.length > 0
            ? response.presencas[0].participantes
            : [];
        },
        error: (err) => {
          console.error('Erro ao buscar atividades:', err);
          this.atividadesDoDia = [];
        }
      });
  }

  getNumeroMes(mes: string): number {
    return this.meses.indexOf(mes);
  }
}
