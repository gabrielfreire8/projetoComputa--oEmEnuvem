import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  email: string = '';
  novaSenha: string = '';
  token: string = '';
  mensagem: string = '';
  tokenRecebido: boolean = false;
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  solicitarRecuperacao() {
    const payload = { email: this.email };
    this.http.post(`${this.apiUrl}/forgotPassword`, payload).subscribe(
      (response: any) => {
        this.mensagem = 'Um e-mail foi enviado com o token.';
        this.tokenRecebido = true;
      },
      (error) => {
        this.mensagem = 'Erro ao solicitar recuperação de senha.';
      }
    );
  }

  resetarSenha() {
    const payload = {
      token: this.token,
      password: this.novaSenha,
    };

    this.http.post(`${this.apiUrl}/reset/${payload.token}`, { password: payload.password }).subscribe(
      (response: any) => {
        this.mensagem = 'Senha redefinida com sucesso.';
        this.tokenRecebido = false;
        this.email = '';
        this.novaSenha = '';
        this.token = '';
        this.router.navigate(['/menuInicial']);
      },
      (error) => {
        console.log(error)
        this.mensagem = 'Erro ao redefinir a senha.';
      }
    );
  }
}
