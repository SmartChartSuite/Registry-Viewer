import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherHistoryComponent } from './other-history.component';

describe('OtherHistoryComponent', () => {
  let component: OtherHistoryComponent;
  let fixture: ComponentFixture<OtherHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
