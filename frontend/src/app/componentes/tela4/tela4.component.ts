import { Component } from '@angular/core';
import { CadastroService } from './cadastro.sevice';


@Component({
  selector: 'app-tela4',
  templateUrl: './tela4.component.html',
  styleUrls: ['./tela4.component.css']
})
export class Tela4Component {
  usuario = {
    primeiroNome: '',
    sobrenome: '',
    email: '',
    senha: '',
    cpf: '',
    dataNascimento: '',
    celular: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: ''
  };

  constructor(private cadastroService: CadastroService) {}

  cadastrar() {
    this.cadastroService.cadastrarUsuario(this.usuario).subscribe(
      response => {
        console.log('Usuário cadastrado com sucesso!', response);
        // Redirecione ou mostre uma mensagem de sucesso
      },
      error => {
        console.error('Erro ao cadastrar usuário', error);
        // Mostre uma mensagem de erro
      }
    );
  }
}
