import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tela6Component } from './tela6.component';
import { Tela6Service } from './tela6.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [Tela6Service],

})
export class Tela6Module { }
