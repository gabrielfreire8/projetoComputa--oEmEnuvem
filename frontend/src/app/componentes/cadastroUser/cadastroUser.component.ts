import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface CepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
}

@Component({
  selector: 'app-cadastroUser',
  templateUrl: './cadastroUser.component.html',
  styleUrls: ['./cadastroUser.component.css'],
})
export class CadastroUserComponent {
  usuario = {
    cpf: "",
    dataNascimento: "",
    genero: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    cep: "",
    telefone: "",
    email: "",
    nome: '',
    sobrenome: '',
    matricula: 0,
    complemento: undefined,
    numero: undefined
  };

  constructor(private http: HttpClient, private router: Router) {}


  cadastrar(form: NgForm) {
    if (form.valid) {
      console.log('Tentando cadastrar usuário:', this.usuario);


      this.http.post('', this.usuario).subscribe(
        (response: any) => {
          console.log('Usuário cadastrado com sucesso:', response);
          alert('Usuário cadastrado com sucesso!');
          this.router.navigate(['/tela3']);
        },
        (error: any) => {
          console.error('Erro ao cadastrar usuário:', error);
          alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
        }
      );
    } else {
      console.error('Formulário inválido', form);
      alert('Por favor, preencha todos os campos obrigatórios.');
    }
  }


  buscarCEP() {
    if (this.usuario.cep) {

      this.http.get<CepResponse>(`https://viacep.com.br/ws/${this.usuario.cep}/json/`).subscribe(
        (dados: CepResponse) => {
          this.usuario.logradouro = dados.logradouro || '';
          this.usuario.bairro = dados.bairro || '';
          this.usuario.cidade = dados.localidade || '';

          console.log('Dados do CEP:', dados);
          console.log('Endereço completo:', this.usuario.logradouro, this.usuario.bairro, this.usuario.cidade);
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
          alert('Erro ao buscar o CEP. Tente novamente.');
        }
      );
    }
  }
}
