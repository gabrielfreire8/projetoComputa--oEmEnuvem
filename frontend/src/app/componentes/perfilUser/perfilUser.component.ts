import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-perfilUser',
  templateUrl: './perfilUser.component.html',
  styleUrls: ['./perfilUser.component.css']
})
export class PerfilUserComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: '',
    cpf: '',
    dataNascimento: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: ''
  };

  private apiUrl = `${environment.apiUrl}/beneficiados`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obterDadosUsuario(); // Carregar dados do usuário ao inicializar o componente
  }

  obterDadosUsuario(): void {
    // Aqui vamos buscar o usuário usando o CPF ou ID. Suponho que você tenha o CPF do usuário para realizar a requisição.
    this.http.get<any>(`${this.apiUrl}/cpf/${this.usuario.cpf}`).subscribe({
      next: (data) => {
        this.usuario = data; // Preenche o objeto usuario com os dados da API
      },
      error: (error) => {
        console.error('Erro ao obter dados do usuário:', error);
        alert('Erro ao carregar os dados do usuário.');
      }
    });
  }

  alterarDados(form: NgForm): void {
    if (form.valid) {
      this.http.put(`${this.apiUrl}/atualizar`, this.usuario).subscribe({
        next: (response) => {
          alert('Dados alterados com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao alterar os dados:', error);
          alert('Erro ao alterar os dados.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  inativarParticipante(): void {
    this.http.delete(`${this.apiUrl}/deletar/${this.usuario.cpf}`).subscribe({
      next: (response) => {
        alert('Participante inativado!');
      },
      error: (error) => {
        console.error('Erro ao inativar participante:', error);
        alert('Erro ao inativar participante.');
      }
    });
  }
}
