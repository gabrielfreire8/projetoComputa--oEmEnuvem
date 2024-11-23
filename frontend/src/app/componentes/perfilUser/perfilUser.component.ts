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
    this.obterDadosUsuario();
  }

  obterDadosUsuario(): void {
    const cpf = localStorage.getItem('cpf'); 
    if (cpf) {

      this.http.get<any>(`${this.apiUrl}/beneficiados/${cpf}`).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (error) => {
          console.error('Erro ao obter dados do usuário:', error);
          alert('Erro ao carregar os dados do usuário.');
        }
      });
    } else {
      alert('CPF não encontrado. Por favor, faça login novamente.');
    }
  }

  alterarDados(form: NgForm): void {
    if (form.valid) {
      const cpf = this.usuario.cpf;


      this.http.put(`${this.apiUrl}/beneficiados/${cpf}`, this.usuario).subscribe({
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
    const cpf = this.usuario.cpf;

    this.http.delete(`${this.apiUrl}/beneficiados/delete`, { body: { cpf } }).subscribe({
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
