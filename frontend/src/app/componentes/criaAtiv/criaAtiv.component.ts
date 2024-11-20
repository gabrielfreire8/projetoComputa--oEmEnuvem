import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-criaAtiv',
  templateUrl: './criaAtiv.component.html',
  styleUrls: ['./criaAtiv.component.css'],
})
export class CriaAtivComponent implements OnInit {
  mes: string;
  ano: number;
  dias: number[] = [];
  diaSelecionado: number | null = null;
  atividades: any[] = [];
  nomeAtividade: string = '';
  tipoAtividade: string = '';
  descricaoAtividade: string = '';

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    const dataAtual = new Date();
    this.mes = this.getNomeMes(dataAtual.getMonth());
    this.ano = dataAtual.getFullYear();
  }

  ngOnInit() {
    this.calcularDiasDoMes();
    this.obterAtividades();
  }

  calcularDiasDoMes() {
    const primeiroDia = new Date(this.ano, this.getNumeroMes(this.mes), 1);
    const ultimoDia = new Date(this.ano, this.getNumeroMes(this.mes) + 1, 0);
    this.dias = Array.from({ length: ultimoDia.getDate() }, (_, i) => i + 1);
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
  }

  formatarData() {
    if (this.diaSelecionado !== null) {
      const anoFormatado = this.ano.toString();
      const mesFormatado = (this.getNumeroMes(this.mes) + 1).toString().padStart(2, '0');
      const diaFormatado = this.diaSelecionado.toString().padStart(2, '0');
      return `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
    }
    return "";
  }

  enviarAtividade() {
    if (this.nomeAtividade && this.tipoAtividade && this.descricaoAtividade && this.diaSelecionado !== null) {
      const dataAtividade = this.formatarData();
      const body = {
        data: dataAtividade,
        descricao: this.descricaoAtividade,
        nome: this.nomeAtividade,
        tipo: this.tipoAtividade,
      };

      this.http.post<any>(`${this.apiUrl}/atividade/criar`, body).subscribe({
        next: () => {
          alert('Atividade enviada para análise!');


          this.nomeAtividade = '';
          this.tipoAtividade = '';
          this.descricaoAtividade = '';
          this.diaSelecionado = null;


          this.obterAtividades();
        },
        error: (error) => {
          console.error('Erro ao salvar atividade:', error);
          alert('Erro ao enviar a atividade. Tente novamente mais tarde.');
        }
      });
    } else {
      alert('Por favor, preencha todos os campos e selecione um dia.');
    }
  }

  obterAtividades() {
    this.http.get<any[]>(`${this.apiUrl}/atividades`).subscribe({
      next: (atividades) => {
        this.atividades = atividades;
        console.log('Atividades carregadas:', this.atividades);
      },
      error: (error) => {
        console.error('Erro ao carregar atividades:', error);
      }
    });
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
