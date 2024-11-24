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
  cpf: string = '';
  beneficiados: { nome: string; cpf: string }[] = [];
  
  apiUrl = environment.apiUrl;
matricula: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarBeneficiados();
  }


  carregarBeneficiados(): void {
    this.http
      .get<{ nome: string; cpf: string }[]>(`${this.apiUrl}/beneficiados`)
      .subscribe({
        next: (data) => {
          this.beneficiados = data;
          console.log('Beneficiados carregados:', this.beneficiados);
        },
        error: (error) => {
          console.error('Erro ao carregar beneficiados:', error);
          alert('Erro ao carregar beneficiados. Verifique o console para mais detalhes.');
        },
      });
  }


  atualizarCpfPeloNome(nome: string): void {
    const beneficiado = this.beneficiados.find(
      (b) => b.nome.toLowerCase() === nome.toLowerCase()
    );
    if (beneficiado) {
      this.cpf = beneficiado.cpf;
      console.log('CPF encontrado:', this.cpf);
    } else {
      this.cpf = '';
      alert('Nome não encontrado na lista de beneficiados.');
    }
  }


  salvarPresenca(): void {
    if (this.dataPresenca && this.cpf) {
      const dataFormatada = this.formatarData(this.dataPresenca);

      const presenca = {
        cpf: this.cpf,
        data: dataFormatada,
      };

      this.http.post(`${this.apiUrl}/presenca/atividade`, presenca).subscribe({
        next: () => {
          alert('Presença registrada com sucesso!');
          this.dataPresenca = '';
          this.nomeCompleto = '';
          this.cpf = '';
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

  formatarData(data: string): string {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
    const dia = dataObj.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }
}
