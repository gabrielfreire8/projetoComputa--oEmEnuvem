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
    nome: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    email: '',
    cep: '',
    rua: '',
    numero: undefined,
    bairro: '',
    cidade: '',
  };

  private apiUrl = `${environment.apiUrl}/beneficiados/cadastro`;
  private verificarCpfUrl = `${environment.apiUrl}/beneficiados/verificarCpf`;

  constructor(private http: HttpClient, private router: Router, private datePipe: DatePipe) {}

  cadastrar(form: NgForm) {
    if (form.valid) {
      // Remover caracteres não numéricos do CPF
      this.usuario.cpf = String(this.usuario.cpf).replace(/\D/g, '');

      // Verificar se o CPF já está cadastrado
      this.http.get<any>(`${this.verificarCpfUrl}/${this.usuario.cpf}`).subscribe(
        (response) => {
          if (response.exists) {
            alert('Este CPF já está cadastrado. Por favor, verifique os dados.');
            return;
          }

          // Validar a data de nascimento
          if (this.usuario.dataNascimento) {
            const formattedDate = this.datePipe.transform(this.usuario.dataNascimento, 'yyyy-MM-dd');
            if (!formattedDate) {
              alert('Data de nascimento inválida. Por favor, insira uma data válida.');
              return;
            }
            this.usuario.dataNascimento = formattedDate;
          }

          console.log('Dados enviados para cadastro:', this.usuario);

          // Enviar os dados para o backend
          this.http.post(this.apiUrl, this.usuario).subscribe(
            (response: any) => {
              if (response.status === 200) {
                console.log('Usuário cadastrado com sucesso:', response);
                alert('Usuário cadastrado com sucesso!');
                this.router.navigate(['/cadastroUser']);
              } else {
                console.error('Erro ao cadastrar usuário:', response.message);
                alert(response.message || 'Erro ao cadastrar usuário. Tente novamente.');
              }
            },
            (error: any) => {
              console.error('Erro ao cadastrar usuário:', error);
              this.handleCadastroError(error);
            }
          );
        },
        (error) => {
          console.error('Erro ao verificar CPF:', error);
          alert('Erro ao verificar o CPF. Tente novamente.');
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
            this.usuario.rua = dados.logradouro || '';
            this.usuario.bairro = dados.bairro || '';
            this.usuario.cidade = dados.localidade || '';
            console.log('Dados do CEP:', dados);
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

  // Método de tratamento de erro para o cadastro
  private handleCadastroError(error: any) {
    if (error.status === 422) {
      alert(`Erro 422 - Dados inválidos: ${error.error.message || 'Verifique os dados enviados.'}`);
    } else if (error.status === 404) {
      alert('Erro: CPF não encontrado. Verifique os dados e tente novamente.');
    } else {
      alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
  }
}
