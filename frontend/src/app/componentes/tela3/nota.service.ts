import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Nota } from './nota.model';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  private apiUrl = ''; // api

  constructor(private http: HttpClient) {}

  salvarNota(nota: Nota): Observable<any> {
    return this.http.post<any>(this.apiUrl, nota);
  }
}
