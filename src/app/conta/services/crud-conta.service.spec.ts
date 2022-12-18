import { TestBed } from '@angular/core/testing';

import { CrudContaService } from './crud-conta.service';

describe('CrudContaService', () => {
  let service: CrudContaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudContaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
