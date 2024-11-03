import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPassComponent } from './forget-pass.component';
import { beforeEach, describe } from 'node:test';

describe('ForgetPassComponent', () => {
  let component: ForgetPassComponent;
  let fixture: ComponentFixture<ForgetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgetPassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
