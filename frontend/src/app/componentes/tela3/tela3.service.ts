// tela3.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface Nota {
  dia: number;
  texto: string;
  data?: string;
  descricao?: string;
  tipo?: string;
  nome?: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tela3Service {
  private notas: Nota[] = [];
  private notasSubject = new BehaviorSubject<Nota[]>(this.notas);
  private apiUrl = 'http://186.235.2.225/atividades';

  constructor(private http: HttpClient) {}

  salvarNota(dia: number, texto: string): Observable<Nota> {
    const novaNota = { dia, texto };
    return this.http.post<Nota>(this.apiUrl, novaNota).pipe(
      tap((notaSalva) => {
        this.notas.push(notaSalva);
        this.notasSubject.next(this.notas);
      })
    );
  }

  obterNotas(): Observable<Nota[]> {
    return this.http.get<Nota[]>(this.apiUrl).pipe(
      tap((notas) => {
        this.notas = notas;
        this.notasSubject.next(this.notas);
      })
    );
  }
}
