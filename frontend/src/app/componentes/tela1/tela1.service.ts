import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tela1Service {

  private readonly API = 'http:localhost:3000/tela1'

  constructor(private http: HttpClient) { }

  criar(){
    return this.http.get(this.API)
  }

}
