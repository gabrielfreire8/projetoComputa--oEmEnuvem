import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from './atividade.model';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-aprovaAtiv',
  templateUrl: './aprovaAtiv.component.html',
  styleUrls: ['./aprovaAtiv.component.css'],
})
export class AprovaAtivComponent implements OnInit {
  atividades: Atividade[] = [];


  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarAtividades();
  }


  buscarAtividades(): void {
    this.http.get(`${this.apiUrl}/atividades`).subscribe({

      next: (data: any) => {
        console.log('Resposta da API:', data);

        this.atividades = Array.isArray(data.atividades) ? data.atividades : [];
      },
      error: (error) => {
        console.error('Erro ao buscar atividades:', error);
      },
    });
  }



  aprovarAtividade(atividade: Atividade): void {

    const payload = {
      idAtividade: atividade.idatividades,
      idAprovador: 1,
    };

    console.log('Enviando payload para aprovação direta:', JSON.stringify(payload, null, 2));


    this.http.post(`${this.apiUrl}/atividades/aprovar`, payload).subscribe({
      next: (response: any) => {
        console.log('Resposta da API (aprovação direta):', response);


        alert(`Atividade "${atividade.nome}" aprovada com sucesso!`);


        this.atividades = this.atividades.filter(a => a.idatividades !== atividade.idatividades);
      },
      error: (error) => {
        console.error('Erro ao aprovar atividade diretamente:', error);

        if (error.status === 403) {
          alert('Permissão negada ou erro ao aprovar a atividade.');
        } else {
          alert('Erro ao aprovar atividade. Tente novamente mais tarde.');
        }
      },
    });
  }









rejeitarAtividade(atividade: Atividade): void {
  const atividadeId = atividade.idatividades;
  const url = `${this.apiUrl}/atividade/apagar/${atividadeId}`;

  console.log('Rejeitando a atividade com ID:', atividadeId);

  this.http.delete(url).subscribe({
    next: () => {
      console.log('Atividade rejeitada:', atividade.nome);
      alert(`Atividade "${atividade.nome}" rejeitada com sucesso!`);
      this.atividades = this.atividades.filter(a => a.idatividades !== atividadeId);
    },
    error: (error) => {
      console.error('Erro ao rejeitar atividade:', error);
      alert('Erro ao rejeitar atividade. Tente novamente.');
    }
  });
}










}
