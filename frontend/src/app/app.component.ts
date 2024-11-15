import { Component } from '@angular/core';


interface atividadeObj {
  nome: string;
  tipo: string;
  descricao: string;
  data: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  ngOnInit(): void {}
}
