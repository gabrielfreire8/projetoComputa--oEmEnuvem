import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../src/environment';

@Injectable({
  providedIn: 'root'
})
export class Tela1Service {
  private readonly API = environment.apiUrl;  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.API}/186.235.2.225`, loginData);
  }
}
