// tela6.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Atividade } from './atividade.model';

@Injectable({
  providedIn: 'root'
})
export class Tela6Service {
  private apiUrl = 'http://sua-api.com/atividades'; // Altere para a URL da sua API

  constructor(private http: HttpClient) {}

  aprovarAtividade(atividade: Atividade): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/aprovar/${atividade.id}`, atividade);
  }

  rejeitarAtividade(atividade: Atividade): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/rejeitar/${atividade.id}`, atividade);
  }

  // Método para obter atividades
  getAtividades(): Observable<Atividade[]> {
    // Se você tiver um endpoint para isso, substitua a chamada abaixo
    return of([
      { id: 1, nome: 'Atividade 1', tipo: 'Tipo A', descricao: 'Descrição 1', data: '2024-10-01' },

    ]);
  }
}
