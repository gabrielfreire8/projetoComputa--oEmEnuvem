
import { Tela3Service } from './tela3.service';
import { Component } from '@angular/core';
import { NotaService } from './nota.service';
import { Nota } from './nota.model';

@Component({
  selector: 'app-tela3',
  templateUrl: './tela3.component.html',
  styleUrls: ['./tela3.component.css']
})
export class Tela3Component {
  nota: Nota = {
    data: '',
    texto: ''
  };
  diaSelecionado: number | null = null;

  constructor(private notaService: NotaService) {}

  selecionarDia(dia: number) {
    const hoje = new Date();
    this.nota.data = new Date(hoje.getFullYear(), hoje.getMonth(), dia).toISOString().split('T')[0];
    this.diaSelecionado = dia;
  }

  salvarNota() {
    if (!this.nota.texto || !this.nota.data) {
      console.error('Texto ou data não estão preenchidos!');
      return;
    }

    this.notaService.salvarNota(this.nota).subscribe(
      (response) => {
        console.log('Nota salva com sucesso:', response);
        // Limpar o campo de texto após salvar
        this.nota.texto = '';
      },
      (error) => {
        console.error('Erro ao salvar a nota:', error);
      }
    );
  }
}




