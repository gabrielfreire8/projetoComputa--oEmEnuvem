import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Nota {
  dia: number;
  texto: string;
}

@Injectable({
  providedIn: 'root'
})
export class Tela3Service {
  private notas: Nota[] = [];
  private notasSubject = new BehaviorSubject<Nota[]>(this.notas);

  constructor() {}

  salvarNota(dia: number, texto: string): void {
    this.notas.push({ dia, texto });
    this.notasSubject.next(this.notas);
  }

  obterNotas() {
    return this.notasSubject.asObservable();
  }
}
