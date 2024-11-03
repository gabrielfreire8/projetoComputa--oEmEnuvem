import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  private apiUrl = 'http://seu-backend-api.com'; // Altere para a URL real da sua API

  constructor(private http: HttpClient) {}

  solicitarRecuperacao(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resetar-senha`, { email });
  }

  resetarSenha(email: string, novaSenha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nova-senha`, { email, novaSenha });
  }
}
