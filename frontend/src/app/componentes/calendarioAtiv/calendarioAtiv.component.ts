import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-calendarioAtiv',
  templateUrl: './calendarioAtiv.component.html',
  styleUrls: ['./calendarioAtiv.component.css']
})
export class CalendarioAtivComponent implements OnInit {
  atividadesAprovadas: any[] = [];
  mes!: string;
  ano!: number;
  dias: { dia: number; comAtividade: boolean }[] = [];
  diaSelecionado: number | null = null;
  atividadesDoDia: any[] = [];

  private apiUrl = environment.apiUrl;
  private meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  private mesAnterior!: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.mes = 'Novembro';
    this.ano = 2024;
    this.carregarCalendario();
    this.buscarAtividadesAprovadas();





  }

  carregarCalendario() {
    const numeroMes = this.getNumeroMes(this.mes);
    const diasNoMes = new Date(this.ano, numeroMes + 1, 0).getDate();
    this.dias = Array.from({ length: diasNoMes }, (_, i) => {
      const dia = i + 1;
      return { dia, comAtividade: false };
    });
  }


  buscarAtividadesAprovadas(): void {
    this.http.get(`${this.apiUrl}/atividades/aprovadas`).subscribe({
      next: (data: any) => {
        console.log('Resposta da API (atividades aprovadas):', data);

        this.atividadesAprovadas = Array.isArray(data.atividades) ? data.atividades : [];
        this.marcarDiasComAtividades();
      },
      error: (error) => {
        console.error('Erro ao buscar atividades aprovadas:', error);
      },
    });
  }

  marcarDiasComAtividades() {

    this.dias.forEach((diaObj) => {

      const atividadesNoDia = this.atividadesAprovadas.filter(atividade =>
        this.compararDiaAtividade(new Date(atividade.data), diaObj.dia)
      );

      diaObj.comAtividade = atividadesNoDia.length > 0;
    });
  }


  compararDiaAtividade(dataAtividade: Date, diaCalendario: number): boolean {
    return dataAtividade.getFullYear() === this.ano &&
            dataAtividade.getMonth() === this.getNumeroMes(this.mes) &&
            dataAtividade.getDate() === diaCalendario;
  }

  getNumeroMes(mes: string): number {
    return this.meses.indexOf(mes);
  }

  selecionarDia(dia: number) {
    if (this.diaSelecionado === dia) {

      this.diaSelecionado = null;
      this.atividadesDoDia = [];
    } else {

      this.diaSelecionado = dia;
      this.atividadesDoDia = this.atividadesAprovadas.filter(atividade => {
        return new Date(atividade.data).getDate() === dia;
      });
    }
  }

  isDiaSelecionado(dia: number): boolean {
    return dia === this.diaSelecionado;
  }

  temAtividade(dia: number): boolean {
    return this.dias.find(d => d.dia === dia)?.comAtividade || false;
  }

  mudarMes(direcao: number) {
    const indexAtual = this.meses.indexOf(this.mes);
    let novoIndex = indexAtual + direcao;

    if (novoIndex < 0) {
      novoIndex = 11;
      this.ano--;
    } else if (novoIndex > 11) {
      novoIndex = 0;
      this.ano++;
    }

    this.mes = this.meses[novoIndex];


    if (this.mes !== this.mesAnterior) {
      this.mesAnterior = this.mes;
      this.carregarCalendario();
      this.buscarAtividadesAprovadas();
    }
  }
}
