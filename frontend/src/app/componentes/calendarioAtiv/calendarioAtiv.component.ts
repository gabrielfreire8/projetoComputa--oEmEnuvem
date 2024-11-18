import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendarioAtiv',
  templateUrl: './calendarioAtiv.component.html',
  styleUrls: ['./calendarioAtiv.component.css']
})
export class CalendarioAtivComponent implements OnInit {
  atividades: any[] = [];
  mes!: string;
  ano!: number;
  dias: number[] = [];
  diaSelecionado: number | null = null;
  atividadeSelecionada: any = null;

  notasSalvas: { [data: string]: string } = {};

  private apiUrl = "http://44.201.147.191/atividades";

  private meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.mes = 'Janeiro';
    this.ano = 2024;
    this.carregarCalendario();
    this.obterAtividades();
  }

  carregarCalendario() {
    const numeroMes = this.getNumeroMes(this.mes);
    const diasNoMes = new Date(this.ano, numeroMes + 1, 0).getDate();
    this.dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  }

  obterAtividades() {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Dados recebidos da API:', data);
        this.atividades = data || [];
        this.marcarAtividadesNoCalendario();
      },
      error: (error) => {
        console.error('Erro ao obter atividades:', error);
      }
    });
  }

  marcarAtividadesNoCalendario() {
    if (Array.isArray(this.atividades)) {
      this.atividades.forEach((atividade) => {
        const dataAtividade = new Date(atividade.data);
        const diaAtividade = dataAtividade.getDate();
        const dataFormatada = this.formatarData(diaAtividade);

        this.notasSalvas[dataFormatada] = atividade.descricao;
      });
    }
  }

  getNumeroMes(mes: string): number {
    return this.meses.indexOf(mes);
  }

  formatarData(dia?: number): string {
    const diaSelecionadoLocal = dia !== undefined ? dia : this.diaSelecionado;
    if (diaSelecionadoLocal !== null) {
      const anoFormatado = this.ano.toString();
      const mesFormatado = (this.getNumeroMes(this.mes) + 1).toString().padStart(2, '0');
      const diaFormatado = diaSelecionadoLocal.toString().padStart(2, '0');
      return `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
    }
    return '';
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
    const dataSelecionada = this.formatarData(dia);

    this.atividadeSelecionada = this.atividades.find(atividade => {
      const dataAtividade = new Date(atividade.data);
      const dataFormatadaAtividade = this.formatarData(dataAtividade.getDate());


      return dataFormatadaAtividade === dataSelecionada;
    });
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
    this.carregarCalendario();
  }
}
