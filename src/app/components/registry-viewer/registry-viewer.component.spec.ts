import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryViewerComponent } from './registry-viewer.component';

describe('RegistryViewerComponent', () => {
  let component: RegistryViewerComponent;
  let fixture: ComponentFixture<RegistryViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
