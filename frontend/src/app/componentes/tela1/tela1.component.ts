import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Tela1Service } from './tela1.service';

@Component({
  selector: 'app-tela1',
  templateUrl: './tela1.component.html',
  styleUrls: ['./tela1.component.css']
})
export class Tela1Component {
  loginData = { email: '', password: '' };

  constructor(private tela1Service: Tela1Service, private router: Router) {}

  // Método para enviar o login
  submit() {
    this.tela1Service.login(this.loginData.email, this.loginData.password).subscribe(
      (response) => {
        if (response && response.token) {  // Verifica se a resposta contém o token
          localStorage.setItem('token', response.token);
          alert('Login realizado com sucesso!');
          this.router.navigate(['/tela2']);
        } else {
          alert('Falha no login. Token inválido.');
        }
      },
      (error) => {
        console.error('Erro de login:', error);
        alert('Falha no login. Verifique seu email e senha.');
      }
    );
  }


  recuperarSenha() {
    if (this.loginData.email) {
      this.tela1Service.recuperarSenha(this.loginData.email).subscribe(
        () => {
          alert('Instruções de recuperação de senha enviadas para o seu email.');
        },
        (error) => {
          console.error('Erro ao enviar recuperação de senha:', error);
          alert('Erro ao tentar enviar instruções de recuperação de senha.');
        }
      );
    } else {
      alert('Por favor, insira o email para recuperação de senha.');
    }
  }
}
