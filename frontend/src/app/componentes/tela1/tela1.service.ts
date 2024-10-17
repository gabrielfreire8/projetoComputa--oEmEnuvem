import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environment';  // Ajuste o caminho se necessário

@Injectable({
  providedIn: 'root'
})
export class Tela1Service {
  private readonly API = environment.apiUrl;  // Use a URL do ambiente

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.API}/login`, loginData);  // Ajuste a URL conforme sua API
  }
}
