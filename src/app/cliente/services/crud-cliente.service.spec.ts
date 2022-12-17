import { TestBed } from '@angular/core/testing';

import { CrudClienteService } from './crud-cliente.service';

describe('CrudClienteService', () => {
  let service: CrudClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
