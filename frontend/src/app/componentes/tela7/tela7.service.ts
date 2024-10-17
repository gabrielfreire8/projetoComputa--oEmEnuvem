import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tela7Service {
  atividades: any[] = [];

  salvarAtividade(atividade: any) {
    this.atividades.push(atividade);
    console.log('Atividade salva:', atividade);
  }
}
