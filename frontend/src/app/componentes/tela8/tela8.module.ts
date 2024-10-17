import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tela8Component } from './tela8.component';
import { PresencaService } from './presenca.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule

  ],
  providers: [PresencaService],
  exports: []
})
export class Tela8Module { }
