// service.atividade.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Atividade } from './atividade.model'; // Verifique se o caminho está correto

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  private atividades: Atividade[] = [];
  private atividadesSubject = new BehaviorSubject<Atividade[]>(this.atividades);
  public atividades$ = this.atividadesSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/atividades'; // URL da sua API

  constructor(private http: HttpClient) {
    this.obterAtividades(); // Carrega as atividades ao inicializar o serviço
  }

  obterAtividades(): void {
    this.http.get<Atividade[]>(this.apiUrl).pipe(
      tap((atividades) => {
        this.atividades = atividades; // Atualiza as atividades
        this.atividadesSubject.next(this.atividades); // Emite novas atividades
      })
    ).subscribe(); // Inscreve-se para que a chamada ocorra
  }

  aprovarAtividade(atividade: Atividade): Observable<any> {
    return this.http.put(`${this.apiUrl}/aprovar/${atividade.id}`, {}).pipe(
      tap(() => {
        // Opcional: você pode fazer alguma lógica adicional aqui
      })
    );
  }

  rejeitarAtividade(atividade: Atividade): Observable<any> {
    return this.http.put(`${this.apiUrl}/rejeitar/${atividade.id}`, {}).pipe(
      tap(() => {
        // Opcional: você pode fazer alguma lógica adicional aqui
      })
    );
  }
}
