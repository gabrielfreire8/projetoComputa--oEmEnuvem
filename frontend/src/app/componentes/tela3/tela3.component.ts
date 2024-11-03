import { Component, OnInit } from '@angular/core';
import { Tela3Service } from './tela3.service';
import { Nota } from './nota.model';

@Component({
  selector: 'app-tela3',
  templateUrl: './tela3.component.html',
  styleUrls: ['./tela3.component.css']
})
export class Tela3Component implements OnInit {
  nota: Nota = {
    texto: '', dia: 0,
    data: undefined,
    descricao: undefined,
    tipo: undefined,
    nome: undefined
  };
  diaSelecionado: number | null = null;
  dias: number[] = [];
  mes: string;
  ano: number;

  constructor(private notaService: Tela3Service) {
    const dataAtual = new Date();
    this.mes = this.getNomeMes(dataAtual.getMonth());
    this.ano = dataAtual.getFullYear();
  }

  ngOnInit() {
    this.calcularDiasDoMes();
  }

  calcularDiasDoMes() {
    const primeiroDia = new Date(this.ano, this.getNumeroMes(this.mes), 1);
    const ultimoDia = new Date(this.ano, this.getNumeroMes(this.mes) + 1, 0);
    this.dias = Array.from({ length: ultimoDia.getDate() }, (_, i) => i + 1);
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
    this.nota.dia = dia; // Salva o dia selecionado
  }

  salvarNota() {
    if (this.nota.texto && this.nota.dia) {
      this.notaService.salvarNota(this.nota.dia, this.nota.texto).subscribe(
        (resposta) => {
          console.log('Resposta da API:', resposta); // Exibe a resposta da API
          alert('Nota salva com sucesso!');
          this.nota.texto = ''; // Limpa a nota após salvar
          this.diaSelecionado = null; // Reseta a seleção
        },
        (error) => {
          console.error('Erro ao salvar a nota:', error);
          alert('Erro ao salvar a nota.');
        }
      );
    } else {
      alert('Por favor, selecione um dia e escreva sua nota.');
    }
  }


  mudarMes(delta: number) {
    const mesAtual = this.getNumeroMes(this.mes) + delta;


    if (mesAtual < 0) {
      this.ano -= 1;
      this.mes = this.getNomeMes(11); // Dezembro
    } else if (mesAtual > 11) {
      this.ano += 1;
      this.mes = this.getNomeMes(0); // Janeiro
    } else {
      this.mes = this.getNomeMes(mesAtual);
    }

    // Calcula os dias do novo mês
    this.calcularDiasDoMes();
  }

  getNomeMes(mes: number): string {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses[mes];
  }

  getNumeroMes(mes: string): number {
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    return meses.indexOf(mes);
  }
}
