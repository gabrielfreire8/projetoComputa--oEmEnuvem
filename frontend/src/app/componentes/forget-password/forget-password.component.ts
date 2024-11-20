import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  email: string = '';
  novaSenha: string = '';
  mensagem: string = '';
  tokenRecebido: boolean = false;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  solicitarRecuperacao() {
    if (!this.email) {
      this.mensagem = 'Por favor, insira um e-mail válido.';
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: this.email };

    this.http.post<any>(`${this.apiUrl}/forgot-password`, body, { headers }).subscribe({
      next: () => {
        this.mensagem = 'E-mail de recuperação enviado com sucesso!';
        this.tokenRecebido = true;
      },
      error: (err) => {
        this.mensagem = 'Erro ao enviar o e-mail de recuperação. Tente novamente.';
        console.error(err);
      },
    });
  }

  resetarSenha() {
    if (!this.novaSenha) {
      this.mensagem = 'Por favor, insira uma nova senha.';
      return;
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email: this.email, novaSenha: this.novaSenha };

    this.http.post<any>(`${this.apiUrl}/reset-password`, body, { headers }).subscribe({
      next: () => {
        this.mensagem = 'Senha redefinida com sucesso!';
        this.tokenRecebido = false;
      },
      error: (err) => {
        this.mensagem = 'Erro ao redefinir senha. Verifique suas informações.';
        console.error(err);
      },
    });
  }
}
