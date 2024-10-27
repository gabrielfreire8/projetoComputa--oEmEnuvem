import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../tela4/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'sua-api-url'; 

  constructor(private http: HttpClient) {}

  getUsuarioLogado(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/usuario/logado`);
  }

  atualizarUsuario(usuario: Usuario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/usuario`, usuario);
  }

  inativarUsuario(matricula: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/usuario/${matricula}`);
  }
}
