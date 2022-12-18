import { TestBed } from '@angular/core/testing';

import { CrudAutenticacaoService } from './crud-autenticacao.service';

describe('CrudAutenticacaoService', () => {
  let service: CrudAutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudAutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
