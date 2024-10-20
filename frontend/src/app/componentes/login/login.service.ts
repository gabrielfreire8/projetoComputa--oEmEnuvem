import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from '../types/login-response.type';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class LoginService{
  constructor(private HttpClient: HttpClient){}

  login(name:string, password: string){
    return this.HttpClient.post<LoginResponse>("", {name,password}).pipe(
      tap((value) =>{
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
      })
    )
  }



}
