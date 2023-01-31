import { TestBed } from '@angular/core/testing';

import { HistoricoTransacaoService } from './historico-transacao.service';

describe('HistoricoTransacaoService', () => {
  let service: HistoricoTransacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoTransacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
