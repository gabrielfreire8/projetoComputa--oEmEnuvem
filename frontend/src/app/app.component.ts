import { Component } from '@angular/core';
import { Tela1Service } from './componentes/tela1/tela1.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private tela1Service: Tela1Service) {}
  ngOnInit(): void{




}




}
