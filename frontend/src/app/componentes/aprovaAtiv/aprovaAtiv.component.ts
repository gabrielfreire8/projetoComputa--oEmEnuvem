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
    this.http.post(`${this.apiUrl}/atividades/aprovar`, { id: atividade.id }).subscribe({
      next: () => {
        console.log('Atividade aprovada:', atividade.nome);
        alert(`Atividade "${atividade.nome}" aprovada com sucesso!`);
        this.buscarAtividades();
      },
      error: (error) => {
        console.error('Erro ao aprovar atividade:', error);
        alert('Erro ao aprovar atividade. Tente novamente.');
      },
    });
  }


  rejeitarAtividade(atividade: Atividade): void {
    this.http.post(`${this.apiUrl}/atividades/delete`, { id: atividade.id }).subscribe({
      next: () => {
        console.log('Atividade rejeitada:', atividade.nome);
        alert(`Atividade "${atividade.nome}" rejeitada com sucesso!`);
        this.buscarAtividades();
      },
      error: (error) => {
        console.error('Erro ao rejeitar atividade:', error);
        alert('Erro ao rejeitar atividade. Tente novamente.');
      },
    });
  }
}
