import { TestBed } from '@angular/core/testing';

import { NotaService } from './nota.service';
import { beforeEach, describe } from 'node:test';

describe('NotaService', () => {
  let service: NotaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaService);
  });


});
