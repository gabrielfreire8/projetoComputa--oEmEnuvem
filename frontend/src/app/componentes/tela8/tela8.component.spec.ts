import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela8Component } from './tela8.component';

describe('Tela8Component', () => {
  let component: Tela8Component;
  let fixture: ComponentFixture<Tela8Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Tela8Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela8Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
