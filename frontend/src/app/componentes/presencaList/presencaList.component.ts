import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-presencaList',
  templateUrl: './presencaList.component.html',
  styleUrls: ['./presencaList.component.css'],
})
export class PresencaListComponent implements OnInit {
  dataPresenca: string = '';
  nomeCompleto: string = '';
  matricula: string = '';

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  buscarIdPorNome(nome: string): void {
    if (nome.trim()) {

      this.http
        .get<{ id: number; nome: string }>(`${this.apiUrl}/user/:id${encodeURIComponent(nome)}`)
        .subscribe({
          next: (usuario) => {
            console.log(usuario)
            if (usuario && usuario.id) {
              this.matricula = usuario.id.toString();
              alert('Usuário não encontrado!');
              this.matricula = '';
            }
          },
          error: (error) => {
            console.error('Erro ao buscar ID:', error);

          },
        });
    } else {
      alert('Por favor, insira um nome válido.');
    }
  }

  salvarPresenca(): void {
    if (this.dataPresenca && this.matricula) {
      const dataFormatada = this.formatarData(this.dataPresenca);

      const presenca = {
        matricula: this.matricula,
        data: dataFormatada,
      };

      this.http.post(`${this.apiUrl}/presenca/atividade`, presenca).subscribe({
        next: () => {
          alert('Presença registrada com sucesso!');
          this.dataPresenca = '';
          this.nomeCompleto = '';
          this.matricula = '';
        },
        error: (error) => {
          console.error('Erro ao salvar presença:', error);
          alert('Erro ao salvar presença. Verifique o console para mais detalhes.');
        },
      });
    } else {
      alert('Preencha todos os campos antes de salvar a presença.');
    }
  }

  aprovarPresenca(): void {
    if (this.matricula) {
      this.http
        .put(`${this.apiUrl}/presenca/aprovar/${this.matricula}`, {})
        .subscribe({
          next: () => {
            alert('Presença aprovada com sucesso!');
          },
          error: (error) => {
            console.error('Erro ao aprovar presença:', error);
            alert('Erro ao aprovar presença. Verifique o console para mais detalhes.');
          },
        });
    } else {
      alert('Matrícula inválida. Por favor, verifique os dados antes de aprovar.');
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
