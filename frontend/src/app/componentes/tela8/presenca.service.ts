import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PresencaService {
  private apiUrl = 'https://sua-api.com/presencas'; // URL da sua API

  constructor(private http: HttpClient) {}

  salvarPresenca(presenca: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, presenca, { headers });
  }
}
