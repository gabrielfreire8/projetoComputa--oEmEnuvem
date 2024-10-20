import { Component, Input, OnInit, Output, output } from '@angular/core';
import { Tela1Service } from './tela1.service';
import { Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




NgModule


@Component({
  selector: 'app-tela1',
  templateUrl: './tela1.component.html',
  styleUrl: './tela1.component.css',


})
export class Tela1Component  {

  loginData = {
    email: '',
    password: ''
  };


  constructor(private Tela1Service: Tela1Service, private router: Router) {}

  submit() {
    this.Tela1Service.login(this.loginData.email, this.loginData.password).subscribe(
      (response: any) => {
        console.log('Login realizado com sucesso:', response);
        // Armazene o token de autenticação se houver (localStorage, sessionStorage, etc.)
        // Redirecione o usuário após o login bem-sucedido
        this.router.navigate(['/tela2']);
      },
      (error) => {
        console.error('Erro ao fazer login:', error);
        // Aqui você pode lidar com o erro de login (exibir mensagem, etc.)
      }


    )};
}




