import { TestBed } from '@angular/core/testing';

import { DemoModeService } from './demo-mode.service';

describe('DemoModeService', () => {
  let service: DemoModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
