import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela6Component } from './tela6.component';

describe('Tela6Component', () => {
  let component: Tela6Component;
  let fixture: ComponentFixture<Tela6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
