import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotaService {
  rejeitarAtividade(id: any) {
    throw new Error('Method not implemented.');
  }
  aprovarAtividade(id: any) {
    throw new Error('Method not implemented.');
  }
  atividades$: any;

  constructor(private http: HttpClient) {}

  salvarNota(dia: number, texto: string, nomeAtividade: string, tipoAtividade: string): Observable<any> {
    const atividade = { dia, texto };
    return this.http.post<any>('http://localhost:3000/api/atividades', atividade);
  }
}
