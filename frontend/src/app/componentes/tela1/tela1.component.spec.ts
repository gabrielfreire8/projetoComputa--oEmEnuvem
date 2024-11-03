import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tela1Component } from './tela1.component';
import { beforeEach, describe } from 'node:test';

describe('Tela1Component', () => {
  let component: Tela1Component;
  let fixture: ComponentFixture<Tela1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tela1Component ] // Declare o componente que está sendo testado
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela1Component);
    component = fixture.componentInstance; // Cria uma instância do componente
    fixture.detectChanges(); // Inicializa o componente
  });


});
