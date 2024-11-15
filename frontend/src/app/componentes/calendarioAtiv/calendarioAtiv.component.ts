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

  private baseUrl = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.mes = 'Janeiro';
    this.ano = 2024;
    this.carregarCalendario();
  }

  carregarCalendario() {
    this.dias = Array.from({ length: 31 }, (_, i) => i + 1);
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
  }


  salvarNota() {
    if (this.diaSelecionado !== null && this.nota.texto) {
      const body = {
        dia: this.diaSelecionado,
        texto: this.nota.texto
      };


      this.http.post(`${this.baseUrl}/notas`, body).subscribe(
        (response: any) => {
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


  mudarMes(direcao: number) {
    if (direcao === -1) {
      this.ano -= 1;
    } else if (direcao === 1) {
      this.ano += 1;
    }
    this.carregarCalendario();
  }
}
