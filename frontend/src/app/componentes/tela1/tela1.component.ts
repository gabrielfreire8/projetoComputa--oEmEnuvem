import { Component, Input, OnInit, Output, output } from '@angular/core';
import { Tela1Service } from './tela1.service';
import { EventEmitter } from 'stream';



@Component({
  selector: 'app-tela1',
  templateUrl: './tela1.component.html',
  styleUrl: './tela1.component.css',
  standalone: true,
})
export class Tela1Component  {

@Input()  loginBtn: string = "";
@Input()  senhaBtn: string = "";
@Output("submit") onSubmit = new EventEmitter();

submit(){
  this.onSubmit.emit('submit');






  }

}






  function ngOnInit() {
    throw new Error('Function not implemented.');
  }

