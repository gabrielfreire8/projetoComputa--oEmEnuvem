import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela7Component } from './tela7.component';
import { beforeEach, describe } from 'node:test';

describe('Tela7Component', () => {
  let component: Tela7Component;
  let fixture: ComponentFixture<Tela7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
