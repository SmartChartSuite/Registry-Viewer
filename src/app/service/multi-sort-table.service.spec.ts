import { TestBed } from '@angular/core/testing';

import { MultiSortTableService } from './multi-sort-table.service';

describe('MultiSortTableService', () => {
  let service: MultiSortTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiSortTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
