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
  apiUrl = 'http://44.201.147.191';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}


  buscarMatricula(nome: string): void {
    if (nome.trim()) {
      this.http.get<{ matricula: string }>(`${this.apiUrl}/usuario/${nome}`).subscribe({
        next: (usuario) => {
          this.matricula = usuario.matricula;
        },
        error: (error) => {
          console.error('Erro ao buscar matrícula:', error);
          alert('Usuário não encontrado.');
        },
      });
    }
  }


  salvarPresenca(): void {
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
          this.nomeCompleto = '';
          this.matricula = '';
        },
        error: (error) => {
          console.error('Erro ao registrar presença:', error);
          alert('Erro ao registrar presença. Tente novamente mais tarde.');
        },
      });
    } else {
      alert('Por favor, selecione uma data e verifique a matrícula.');
    }
  }


  formatarData(data: string): string {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataObj.getDate().toString().padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }
}
