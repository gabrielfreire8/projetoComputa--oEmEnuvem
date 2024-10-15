import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Tela1Service {

  private readonly API = '186.235.2.225:3000'

  httpOptions = {
    Headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  };



  constructor(private HttpClient: HttpClient) { }

  public getLivesWithFlag(flag: string){
    return this.HttpClient.get(this.API)
  }
  }


