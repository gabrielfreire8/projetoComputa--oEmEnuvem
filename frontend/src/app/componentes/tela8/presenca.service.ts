import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PresencaService {
  presencas: any[] = [];

  salvarPresenca(presenca: any) {
    this.presencas.push(presenca);
    console.log('Presença registrada:', presenca);
  }
}
