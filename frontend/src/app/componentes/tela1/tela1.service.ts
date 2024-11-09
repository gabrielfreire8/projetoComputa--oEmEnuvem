import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tela1Service {
  private apiUrl = '';  

  constructor(private http: HttpClient) {}


  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, { email, password }, { withCredentials: true });

  }


  recuperarSenha(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recuperar-senha/`, { email });

  }
}
