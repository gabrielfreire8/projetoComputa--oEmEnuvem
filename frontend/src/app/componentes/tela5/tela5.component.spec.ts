import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela5Component } from './tela5.component';

describe('Tela5Component', () => {
  let component: Tela5Component;
  let fixture: ComponentFixture<Tela5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
