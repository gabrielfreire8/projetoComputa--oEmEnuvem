import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendarioAtiv',
  templateUrl: './calendarioAtiv.component.html',
  styleUrls: ['./calendarioAtiv.component.css']
})
export class CalendarioAtivComponent implements OnInit {
  mes!: string;
  ano!: number;
  dias: number[] = [];
  diaSelecionado: number | null = null;
  nota = { texto: '' };
  notasSalvas: { [data: string]: string } = {};

  private apiUrl = 'https://98.81.212.202/atividade/criar';



  private meses: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.mes = 'Janeiro';
    this.ano = 2024;
    this.carregarCalendario();
    this.carregarNotas();
  }

  carregarCalendario() {
    const numeroMes = this.getNumeroMes(this.mes);
    const diasNoMes = new Date(this.ano, numeroMes + 1, 0).getDate();
    this.dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
    const dataFormatada = this.formatarData();
    this.nota.texto = this.notasSalvas[dataFormatada] || '';
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


  salvarNota() {
    if (this.diaSelecionado !== null && this.nota.texto) {
      const dataFormatada = this.formatarData();
      const body = {
        data: dataFormatada,
        texto: this.nota.texto
      };

      this.http.post(`${this.apiUrl}/notas`, body).subscribe(
        (response: any) => {
          this.notasSalvas[dataFormatada] = this.nota.texto;
          console.log('Nota salva com sucesso:', response);
          alert('Nota salva com sucesso!');
        },
        (error: any) => {
          console.error('Erro ao salvar nota:', error);
          alert('Erro ao salvar nota. Tente novamente.');
        }
      );
    } else {
      alert('Selecione um dia e escreva sua nota!');
    }
  }

  carregarNotas() {
    this.http.get(`${this.apiUrl}/notas`).subscribe(
      (response: any) => {
        this.notasSalvas = response.reduce((acc: any, nota: any) => {
          acc[nota.data] = nota.texto;
          return acc;
        }, {});
      },
      (error: any) => {
        console.error('Erro ao carregar notas:', error);
      }
    );
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
