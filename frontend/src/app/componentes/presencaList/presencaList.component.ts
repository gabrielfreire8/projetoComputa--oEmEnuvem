import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-presencaList',
  templateUrl: './presencaList.component.html',
  styleUrls: ['./presencaList.component.css'],
})
export class PresencaListComponent implements OnInit {
  dataPresenca: string = '';
  nomeCompleto: string = '';
  matricula: string = '';
  apiUrl = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.http.get<{ nome: string, matricula: string }>(`${this.apiUrl}/usuario`).subscribe({
      next: (usuario) => {
        this.nomeCompleto = usuario.nome;
        this.matricula = usuario.matricula;
      },
      error: (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    });
  }

  salvarPresenca() {

    if (this.dataPresenca && this.matricula) {
      const dataFormatada = this.formatarData(this.dataPresenca);


      const presenca = {
        matricula: this.matricula,
        data: dataFormatada,
      };


      this.http.post(`${this.apiUrl}/presenca`, presenca).subscribe({
        next: () => {
          alert('Presença registrada com sucesso!');
          this.dataPresenca = '';
        },
        error: (error) => {
          console.error('Erro ao registrar presença:', error);
          alert('Erro ao registrar presença. Tente novamente mais tarde.');
        }
      });
    } else {
      alert('Por favor, selecione uma data e verifique a matrícula.');
    }
  }

  formatarData(data: string): string {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const anoCurto = ano.toString().slice(-2);

    return `${ano}/${anoCurto}/${mes}`;
  }
}
