import { TestBed } from '@angular/core/testing';

import { DrawerService } from './drawer.service';

describe('SidenavService', () => {
  let service: DrawerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
