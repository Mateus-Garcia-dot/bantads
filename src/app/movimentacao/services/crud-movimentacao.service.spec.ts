import { TestBed } from '@angular/core/testing';

import { CrudMovimentacaoService } from './crud-movimentacao.service';

describe('CrudMovimentacaoService', () => {
  let service: CrudMovimentacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudMovimentacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
