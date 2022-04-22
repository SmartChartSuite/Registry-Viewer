import { TestBed } from '@angular/core/testing';

import { CaseRecordsService } from './case-records.service';

describe('CaseExplorerService', () => {
  let service: CaseRecordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseRecordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
