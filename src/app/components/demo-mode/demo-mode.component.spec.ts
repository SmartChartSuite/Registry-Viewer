import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoModeComponent } from './demo-mode.component';

describe('DemoModeComponent', () => {
  let component: DemoModeComponent;
  let fixture: ComponentFixture<DemoModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
