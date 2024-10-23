import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = '186.235.2.225/atividades/aprovacoes'; // api
  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  buscarCEP(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/13710000/json/`);

  }


}
