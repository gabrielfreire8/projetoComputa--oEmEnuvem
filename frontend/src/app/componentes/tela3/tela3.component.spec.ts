import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tela3Component } from './tela3.component';

import { of } from 'rxjs';
import { beforeEach, describe, it } from 'node:test';
import { Tela3Service } from './tela3.service';

class MockTela3Service {
  private notas = [
    { dia: 1, texto: 'Nota do dia 1' },
    { dia: 2, texto: 'Nota do dia 2' }
  ];

  obterNotas() {
    return of(this.notas);
  }

  salvarNota(dia: number, texto: string) {
    this.notas.push({ dia, texto });
  }
}

describe('Tela3Component', () => {
  let component: Tela3Component;
  let fixture: ComponentFixture<Tela3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela3Component],
      providers: [
        { provide: Tela3Service, useClass: MockTela3Service }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
function expect(component: Tela3Component) {
  throw new Error('Function not implemented.');
}

