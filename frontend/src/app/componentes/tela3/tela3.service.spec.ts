import { TestBed } from '@angular/core/testing';
import { Tela3Service } from './tela3.service';

describe('Tela3Service', () => {
  let service: Tela3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tela3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
