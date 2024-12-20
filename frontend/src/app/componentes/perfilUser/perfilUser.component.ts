import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private apiUrl = `${environment.apiUrl}/beneficiados/`;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.solicitarCpfECarregarDados();
  }

  solicitarCpfECarregarDados(): void {
    const cpf = window.prompt('Por favor, insira seu CPF para acessar os dados do perfil:');

    if (!cpf) {
      window.alert('CPF não informado. Não é possível carregar os dados.');
      return;
    }

    window.alert('Buscando os dados do usuário na API. Aguarde um momento.');

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.get<any>(`${this.apiUrl}${cpf}`, { headers }).subscribe({
      next: (data) => {
        console.log('Dados recebidos da API:', data);

        if (data) {

          const usuario = data;

          this.usuario = {
            nome: usuario.nome || '',
            email: usuario.email || '',
            cpf: usuario.cpf || '',
            dataNascimento: this.formatDate(usuario.dataNascimento) || '',
            telefone: usuario.telefone || '',
            cep: usuario.cep || '',
            logradouro: usuario.enderecoRua || '',
            numero: usuario.enderecoNumero || '',
            bairro: usuario.enderecoBairro || '',
            cidade: usuario.cidade || ''
          };

          window.alert('Dados do usuário carregados com sucesso!');
        } else {
          window.alert('Nenhum dado encontrado para o CPF informado.');
        }
      },
      error: (error) => {
        console.error('Erro ao obter dados do usuário:', error);
        window.alert('Erro ao carregar os dados do usuário. Verifique o CPF informado.');
      }
    });
  }


  private formatDate(date: string): string {
    if (date) {
      const formattedDate = new Date(date);
      return formattedDate.toISOString().split('T')[0];
    }
    return '';
  }

  alterarDados(form: NgForm): void {
    if (form.valid) {
      let dataNascimento = this.usuario.dataNascimento;
      if (dataNascimento && dataNascimento.includes('-')) {
        const partes = dataNascimento.split('-');
        dataNascimento = `${partes[0]}-${partes[1]}-${partes[2]}`;
      }
      this.usuario.dataNascimento = dataNascimento;

      this.http.put(`${this.apiUrl}`, this.usuario).subscribe({
        next: () => {
          window.alert('Dados alterados com sucesso!');
        },
        error: (error) => {
          console.error('Erro ao alterar os dados:', error);
          window.alert('Erro ao alterar os dados.');
        }
      });
    } else {
      window.alert('Por favor, preencha todos os campos corretamente.');
    }
  }


  inativarParticipante(): void {
    const cpf = this.usuario.cpf;

    this.http.delete(`${this.apiUrl}delete/${cpf}`).subscribe({
      next: () => {
        window.alert('Participante inativado!');
      },
      error: (error) => {
        console.error('Erro ao inativar participante:', error);
        window.alert('Erro ao inativar participante.');
      }
    });
  }

}
