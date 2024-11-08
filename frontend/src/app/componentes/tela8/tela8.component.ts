import { Component } from '@angular/core';
import { PresencaService } from './presenca.service';

@Component({
  selector: 'app-tela8',
  templateUrl: './tela8.component.html',
  styleUrls: ['./tela8.component.css'],
})
export class Tela8Component {
  nomeCompleto: string = '';
  matricula: string = '';
  dataPresenca: string = '';

  constructor(private presencaService: PresencaService) {}

  salvarPresenca() {
    if (this.nomeCompleto && this.matricula && this.dataPresenca) {
      const presenca = {
        nome: this.nomeCompleto,
        matricula: this.matricula,
        data: this.dataPresenca
      };
      
      this.presencaService.salvarPresenca(presenca).subscribe(
        (response) => {
          console.log('Presença salva com sucesso:', response);
          this.limparCampos();
        },
        (error) => {
          console.error('Erro ao salvar presença:', error);
          alert('Ocorreu um erro ao salvar a presença.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  limparCampos() {
    this.nomeCompleto = '';
    this.matricula = '';
    this.dataPresenca = '';
  }
}
