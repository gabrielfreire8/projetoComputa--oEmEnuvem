import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela2Component } from './menuInicial.component';
import { beforeEach, describe } from 'node:test';

describe('Tela2Component', () => {
  let component: Tela2Component;
  let fixture: ComponentFixture<Tela2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  });

