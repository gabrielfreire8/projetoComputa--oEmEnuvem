import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tela7Component } from './tela7.component';
import { Tela7Service } from './tela7.service';

@NgModule({
  declarations: [Tela7Component],
  imports: [
    CommonModule,

  ],
  providers: [Tela7Service],
  exports: [Tela7Component]
})
export class Tela7Module { }
