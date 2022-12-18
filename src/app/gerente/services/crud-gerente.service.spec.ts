import { TestBed } from '@angular/core/testing';

import { CrudGerenteService } from './crud-gerente.service';

describe('CrudGerenteService', () => {
  let service: CrudGerenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudGerenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
