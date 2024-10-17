import { Component, OnInit } from '@angular/core';
import { Tela3Service } from './tela3.service';





@Component({
  selector: 'app-tela3',
  templateUrl: './tela3.component.html',
  styleUrls: ['./tela3.component.css']
})
export class Tela3Component implements OnInit {
  diaSelecionado: number | null = null;
  textoNota: string = '';
  notas: { dia: number; texto: string }[] = [];

  constructor(private tela3Service: Tela3Service) {}

  ngOnInit(): void {
    this.tela3Service.obterNotas().subscribe(notas => {
      this.notas = notas;
    });
  }

  salvarNota() {
    if (this.diaSelecionado !== null && this.textoNota.trim()) {
      this.tela3Service.salvarNota(this.diaSelecionado, this.textoNota);
      this.textoNota = ''; // Limpa o campo de texto
    }
  }

  selecionarDia(dia: number) {
    this.diaSelecionado = dia;
  }
}
