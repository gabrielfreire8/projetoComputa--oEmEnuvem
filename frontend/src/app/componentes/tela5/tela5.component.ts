import { Usuario } from './../tela4/usuario.model';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../tela4/usuario.service';



@Component({
  selector: 'app-tela5',
  templateUrl: './tela5.component.html',
  styleUrls: ['./tela5.component.css']
})
export class Tela5Component implements OnInit {
  usuario: Usuario = {} as Usuario;

  constructor(
    private usuarioService: UsuarioService,

  ) {}

  ngOnInit(): void {
    this.carregarUsuario(); 
  }

  carregarUsuario() {
    this.usuarioService.getUsuarioLogado().subscribe(
      (response: Usuario) => {
        this.usuario = response; 
      },
      (error) => {
        console.error('Erro ao carregar usuário', error);
      }
    );
  }

  alterarDados(form: NgForm) {
    if (form.valid) {
      this.usuarioService.atualizarUsuario(this.usuario).subscribe(
        () => {
          alert('Dados alterados com sucesso!');
        },
        (error: any) => {
          console.error('Erro ao atualizar dados do usuário', error);
          alert('Erro ao atualizar dados. Tente novamente.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  }

  inativarParticipante() {
    if (this.usuario.matricula) {
      this.usuarioService.inativarUsuario(this.usuario.matricula).subscribe(
        () => {
          alert('Usuário inativado com sucesso!');
        },
        (error: any) => {
          console.error('Erro ao inativar usuário', error);
          alert('Erro ao inativar usuário. Tente novamente.');
        }
      );
    } else {
      alert('Usuário não encontrado.');
    }
  }


}
