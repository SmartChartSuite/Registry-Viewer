import { TestBed } from '@angular/core/testing';

import { CaseExplorerService } from './case-explorer.service';

describe('CaseExplorerService', () => {
  let service: CaseExplorerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseExplorerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
