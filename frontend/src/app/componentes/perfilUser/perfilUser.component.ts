import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
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


  private apiUrl = 'http://44.201.147.191/beneficiados';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obterDadosUsuario();
  }


  obterDadosUsuario(): void {

    this.http.get<any>(`${this.apiUrl}/:d`).subscribe({
      next: (data) => {
        this.usuario = data;
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
    this.http.delete(`${this.apiUrl}/inativar/${this.usuario.cpf}`).subscribe({
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
