import { TestBed } from '@angular/core/testing';

import { CrudEnderecoService } from './crud-endereco.service';

describe('CrudEnderecoService', () => {
  let service: CrudEnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudEnderecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
