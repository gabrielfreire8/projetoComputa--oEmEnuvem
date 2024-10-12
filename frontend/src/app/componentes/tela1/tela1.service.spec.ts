import { TestBed } from '@angular/core/testing';

import { Tela1Service } from './tela1.service';

describe('Tela1Service', () => {
  let service: Tela1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tela1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
