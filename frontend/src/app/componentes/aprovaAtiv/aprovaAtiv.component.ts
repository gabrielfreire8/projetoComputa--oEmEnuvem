import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Atividade } from './atividade.model';

@Component({
  selector: 'app-aprovaAtiv',
  templateUrl: './aprovaAtiv.component.html',
  styleUrls: ['./aprovaAtiv.component.css'],
})
export class AprovaAtivComponent implements OnInit {
  atividades: Atividade[] = [];


  private apiUrl = 'http://44.203.161.167';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.buscarAtividades();
  }


  buscarAtividades(): void {
    this.http.get<Atividade[]>(`${this.apiUrl}/atividades`).subscribe({
      next: (data) => {
        this.atividades = data;
        console.log('Atividades recebidas:', this.atividades);
      },
      error: (error) => {
        console.error('Erro ao buscar atividades:', error);
      },
    });
  }


  aprovarAtividade(atividade: Atividade): void {
    this.http.post(`${this.apiUrl}/aprovar`, { id: atividade.id }).subscribe({
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
    this.http.post(`${this.apiUrl}/rejeitar`, { id: atividade.id }).subscribe({
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
