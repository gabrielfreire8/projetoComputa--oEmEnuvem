import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SenhaService } from './senha.service'; // Altere para o caminho correto do seu serviço

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.css']
})
export class ForgetPassComponent {
  email: string = '';
  novaSenha: string = '';
  mensagem: string = '';
  tokenRecebido: boolean = false; // Controla a exibição do formulário de redefinição de senha

  constructor(private senhaService: SenhaService) {}

  solicitarRecuperacao(form: NgForm) {
    if (form.valid) {
      this.senhaService.solicitarRecuperacao(this.email).subscribe(
        response => {
          this.mensagem = 'Instruções de recuperação de senha foram enviadas para o seu e-mail.';
          this.tokenRecebido = true; // Se o e-mail foi enviado, mostramos o campo para redefinir a senha
          console.log('Resposta da API:', response);
        },
        error => {
          this.mensagem = 'Erro ao enviar o e-mail de recuperação. Tente novamente.';
          console.error('Erro ao solicitar recuperação:', error);
        }
      );
    } else {
      this.mensagem = 'Por favor, insira um e-mail válido.';
    }
  }

  resetarSenha() {
    if (this.novaSenha) {
      this.senhaService.resetarSenha(this.email, this.novaSenha).subscribe(
        response => {
          this.mensagem = 'Senha redefinida com sucesso.';
          console.log('Resposta da API:', response);
        },
        error => {
          this.mensagem = 'Erro ao redefinir a senha. Tente novamente.';
          console.error('Erro ao redefinir senha:', error);
        }
      );
    } else {
      this.mensagem = 'Por favor, insira uma nova senha.';
    }
  }
}
