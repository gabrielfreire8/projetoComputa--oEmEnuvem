import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://186.235.2.225/atividades/aprovacoes'; // URL da API

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  buscarCEP(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  getUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/me`); // Endpoint para obter o usuário logado
  }

  atualizarUsuario(usuario: Usuario): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/usuarios/${usuario.matricula}`, usuario); // Ajuste o endpoint conforme necessário
  }

  inativarUsuario(matricula: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/usuarios/${matricula}`); // Ajuste o endpoint conforme necessário
  }
}
