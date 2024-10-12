import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})


export class Tela3Service {

  private readonly API = 'http://localhost:4200';

  constructor(private http: HttpClient) { }

  salvarDia(dia: number, texto: string): Observable<any> {
    return this.http.post(`${this.API}/Salvar`, { dia, texto });
}
}
