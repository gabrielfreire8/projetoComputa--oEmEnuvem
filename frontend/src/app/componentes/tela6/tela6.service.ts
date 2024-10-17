import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tela6Service {
  private atividades = [
    { nome: 'Atividade 1', tipo: 'Tipo A', descricao: 'Descrição 1', data: '2024-10-01' },
    { nome: 'Atividade 2', tipo: 'Tipo B', descricao: 'Descrição 2', data: '2024-10-02' }
  ];

  getAtividades(): Observable<any[]> {
    return of(this.atividades);
  }
}
