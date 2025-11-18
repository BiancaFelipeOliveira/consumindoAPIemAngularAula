import { TestBed } from '@angular/core/testing';

import { ProdutorServicos } from './produtor.servicos';

describe('ProdutorServicos', () => {
  let service: ProdutorServicos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutorServicos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
