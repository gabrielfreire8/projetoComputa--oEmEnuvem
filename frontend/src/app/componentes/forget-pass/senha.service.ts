import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenhaService {
  private apiUrl = ''; 
  constructor(private http: HttpClient) {}

  solicitarRecuperacao(email: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/resetar-senha`, { email });
  }

  resetarSenha(email: string, novaSenha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/nova-senha`, { email, novaSenha });
  }
}
