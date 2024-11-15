import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obterDadosUsuario();
  }


  obterDadosUsuario(): void {

    this.http.get<any>('').subscribe({
      next: (data) => {

        this.usuario.nome = data.nome;
        this.usuario.email = data.email;
        this.usuario.cpf = data.cpf;
        this.usuario.dataNascimento = data.dataNascimento;
        this.usuario.telefone = data.telefone;
        this.usuario.cep = data.cep;
        this.usuario.logradouro = data.logradouro;
        this.usuario.numero = data.numero;
        this.usuario.bairro = data.bairro;
        this.usuario.cidade = data.cidade;
      },
      error: (error) => {
        console.error('Erro ao obter dados do usuário:', error);
      }
    });
  }


  alterarDados(form: any): void {
    if (form.valid) {

      this.http.put('', this.usuario).subscribe({
        next: (response) => {
          alert('Dados alterados com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao alterar os dados:', error);
          alert('Erro ao alterar os dados.');
        }
      });
    }
  }

  inativarParticipante(): void {

    this.http.delete('').subscribe({
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
