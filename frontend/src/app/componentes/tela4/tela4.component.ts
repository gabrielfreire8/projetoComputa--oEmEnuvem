import { Component } from '@angular/core';
import { CadastroService } from './cadastro.sevice';
import { FormsModule, NgForm } from '@angular/forms';
import { Usuario } from './usuario.model';
import { UsuarioService } from './usuario.service';


@Component({
  selector: 'app-tela4',
  templateUrl: './tela4.component.html',
  styleUrls: ['./tela4.component.css'],



})
export class Tela4Component {
cadastrarUsuario(_t25: NgForm) {
throw new Error('Method not implemented.');
}
      usuario: Usuario = {
        cpf: "",
        dataNascimento:"",
        genero: "",
        cidade: "",
        logradouro: "",
        bairro: "",
        cep: "",
        telefone: "",
        email: "",
        nome: '',
        sobrenome: '',
        senha: ''
      };

    constructor(private usuarioService: UsuarioService) {}


  ngOnInit() {
    // Carregar as informações do usuário ao iniciar o componente
    this.carregarUsuario();
  }

  carregarUsuario() {
    this.usuarioService.getUsuarioLogado().subscribe(
      (response: Usuario) => {
        this.usuario.nome = response.nome;
        this.usuario.sobrenome = response.sobrenome;
        this.usuario.email = response.email;
        this.usuario.senha = ''; // Por segurança, não exibe a senha ao carregar
        this.usuario.cpf = response.cpf;
        this.usuario.dataNascimento = response.dataNascimento;
        this.usuario.telefone = response.telefone;
        this.usuario.cep = response.cep;
        this.usuario.logradouro = response.logradouro;
        this.usuario.bairro = response.bairro;
        this.usuario.cidade = response.cidade;

        console.log('Dados do usuário carregados com sucesso:', this.usuario);
      },
    


      (error: any) => {
        console.error('Erro ao carregar usuário', error);
      }
    );
  }



    cadastrar(form: NgForm) {
      if (form.valid) {
        console.log('Tentando cadastrar usuário:', this.usuario); // Log dos dados do usuário
        this.usuarioService.cadastrarUsuario(this.usuario).subscribe(
          (response: any) => {
            console.log('Usuário cadastrado com sucesso:', response);
            // Aqui você pode redirecionar ou exibir uma mensagem de sucesso
            alert('Usuário cadastrado com sucesso!'); // Mensagem de sucesso
          },
          (error: any) => {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.'); // Mensagem de erro
          }
        );
      } else {
        console.error('Formulário inválido', form); // Log para verificar o estado do formulário
        alert('Por favor, preencha todos os campos obrigatórios.');
      }
    }

    buscarCEP() {
      if (this.usuario.cep) {
        this.usuarioService.buscarCEP(this.usuario.cep).subscribe(
          (dados: { logradouro: string; bairro: string; localidade: string;}) => {
            this.usuario.logradouro = dados.logradouro || "";
            this.usuario.bairro = dados.bairro || "";
            this.usuario.cidade = dados.localidade || "";

            console.log('Dados do CEP:', dados); // Log dos dados recebidos
            console.log('Endereço completo:', this.usuario.logradouro, this.usuario.bairro, this.usuario.cidade);
          },
          (error: any) => {
            console.error('Erro ao buscar CEP:', error);
          }
        );
      }
    }
  }




