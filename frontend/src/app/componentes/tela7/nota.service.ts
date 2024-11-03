// nota.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface Atividade {
  dia: number;
  nome: string;
  tipo: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private atividades: Atividade[] = [];
  private atividadesSubject = new BehaviorSubject<Atividade[]>(this.atividades);
  public atividades$ = this.atividadesSubject.asObservable(); // Expondo o Observable

  private apiUrl = 'http://localhost:3000/api/atividades'; // URL da sua API

  constructor(private http: HttpClient) {
    this.obterAtividades(); // Chama o método para obter atividades ao inicializar
  }

  salvarNota(dia: number, descricao: string, nome: string, tipo: string): Observable<Atividade> {
    const atividade = { dia, nome, tipo, descricao };
    return this.http.post<Atividade>(this.apiUrl, atividade).pipe(
      tap((novaAtividade) => {
        this.atividades.push(novaAtividade);
        this.atividadesSubject.next(this.atividades); // Atualiza o BehaviorSubject
      })
    );
  }

  obterAtividades(): void { // Alterado para void, pois não precisamos retornar o Observable
    this.http.get<Atividade[]>(this.apiUrl).pipe(
      tap((atividades) => {
        this.atividades = atividades;
        this.atividadesSubject.next(this.atividades); // Atualiza o BehaviorSubject
      })
    ).subscribe(); // Assina para que a requisição seja feita
  }
}
