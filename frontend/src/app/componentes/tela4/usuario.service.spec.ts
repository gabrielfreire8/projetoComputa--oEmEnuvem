import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { beforeEach, describe } from 'node:test';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioService);
  });


});
