import { Component, OnInit } from '@angular/core';
import { NotaService } from '../tela3/nota.service';

@Component({
  selector: 'app-tela7',
  templateUrl: './tela7.component.html',
  styleUrls: ['./tela7.component.css'],
})
export class Tela7Component implements OnInit {
  mes: string;
  ano: number;
  dias: number[] = [];
  diaSelecionado: number | null = null;
  atividades: any[] = [];
  nomeAtividade: string = '';
  tipoAtividade: string = '';
  descricaoAtividade: string = '';

  constructor(private notaService: NotaService) {
    const dataAtual = new Date();
    this.mes = this.getNomeMes(dataAtual.getMonth());
    this.ano = dataAtual.getFullYear();
  }

  ngOnInit() {
    this.calcularDiasDoMes();

    // Carregar as atividades ao iniciar o componente
    this.notaService.atividades$().subscribe(
      (atividades: any[]) => {
        this.atividades = atividades;
      },
      (error: any) => {
        console.error('Erro ao obter atividades:', error);
      }
    );

    // Assinar o BehaviorSubject para atualizações em tempo real
    this.notaService.atividades$.subscribe((atividades: any[]) => {
      this.atividades = atividades;
    });
  }

  calcularDiasDoMes() {
    const primeiroDia = new Date(this.ano, this.getNumeroMes(this.mes), 1);
    const ultimoDia = new Date(this.ano, this.getNumeroMes(this.mes) + 1, 0);
    this.dias = Array.from({ length: ultimoDia.getDate() }, (_, i) => i + 1);
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
  }

  enviarAtividade() {
    if (this.nomeAtividade && this.tipoAtividade && this.descricaoAtividade && this.diaSelecionado !== null) {
      this.notaService.salvarNota(
        this.diaSelecionado,
        this.descricaoAtividade,
        this.nomeAtividade,
        this.tipoAtividade
      ).subscribe(
        () => {
          alert('Atividade enviada para análise!');
          this.nomeAtividade = '';
          this.tipoAtividade = '';
          this.descricaoAtividade = '';
          this.diaSelecionado = null;
        },
        (error) => {
          console.error('Erro ao salvar atividade:', error);
          alert('Erro ao enviar a atividade. Tente novamente mais tarde.');
        }
      );
    } else {
      alert('Por favor, preencha todos os campos e selecione um dia.');
    }
  }

  aprovarAtividade(atividade: any) {
    this.notaService.aprovarAtividade(atividade.id);
  }

  rejeitarAtividade(atividade: any) {
    this.notaService.rejeitarAtividade(atividade.id);
  }

  mudarMes(delta: number) {
    const mesAtual = this.getNumeroMes(this.mes);
    let novoMes = mesAtual + delta;

    if (novoMes < 0) {
      novoMes = 11;
      this.ano--;
    } else if (novoMes > 11) {
      novoMes = 0;
      this.ano++;
    }

    this.mes = this.getNomeMes(novoMes);
    this.calcularDiasDoMes();
  }

  getNomeMes(mes: number): string {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[mes];
  }

  getNumeroMes(mes: string): number {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril',
      'Maio', 'Junho', 'Julho', 'Agosto',
      'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses.indexOf(mes);
  }
}
