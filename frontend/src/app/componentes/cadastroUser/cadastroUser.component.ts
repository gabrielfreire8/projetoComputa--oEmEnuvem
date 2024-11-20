import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments/environment';

interface CepResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
}

@Component({
  selector: 'app-cadastroUser',
  templateUrl: './cadastroUser.component.html',
  styleUrls: ['./cadastroUser.component.css'],
  providers: [DatePipe],
})
export class CadastroUserComponent {
  usuario = {
    cpf: "",
    dataNascimento: "",
    cidade: "",
    logradouro: "",
    bairro: "",
    cep: "",
    telefone: "",
    email: "",
    nome: '',
    numero: undefined,
  };

  private apiUrl = `${environment.apiUrl}/beneficiados/cadastro`;

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe) {}

  cadastrar(form: NgForm) {
    if (form.valid) {

      if (this.usuario.dataNascimento) {
        const formattedDate = this.datePipe.transform(this.usuario.dataNascimento, 'yyyy-MM-dd');
        this.usuario.dataNascimento = formattedDate!;
      }

      console.log('Tentando cadastrar usuário:', this.usuario);

      this.http.post(this.apiUrl, this.usuario).subscribe(
        (response: any) => {
          console.log('Usuário cadastrado com sucesso:', response);
          alert('Usuário cadastrado com sucesso!');
          this.router.navigate(['/cadastroUser']);
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
      const cepFormatado = this.usuario.cep.toString().padStart(8, '0');
      this.http.get<CepResponse>(`https://viacep.com.br/ws/${cepFormatado}/json/`).subscribe(
        (dados: CepResponse) => {
          if (dados) {
            this.usuario.logradouro = dados.logradouro || '';
            this.usuario.bairro = dados.bairro || '';
            this.usuario.cidade = dados.localidade || '';

            console.log('Dados do CEP:', dados);
            alert('Endereço encontrado e preenchido com sucesso!');
          } else {
            alert('CEP inválido ou não encontrado.');
          }
        },
        (error: any) => {
          console.error('Erro ao buscar CEP:', error);
          alert('Erro ao buscar o CEP. Verifique o número e tente novamente.');
        }
      );
    } else {
      alert('Por favor, insira um CEP válido.');
    }
  }
}
