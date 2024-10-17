import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela4Component } from './tela4.component';
import { beforeEach, describe } from 'node:test';

describe('Tela4Component', () => {
  let component: Tela4Component;
  let fixture: ComponentFixture<Tela4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela4Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
