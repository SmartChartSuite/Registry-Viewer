import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecordDialogComponent } from './annotation-dialog.component';

describe('AnnotationDialogComponent', () => {
  let component: AddRecordDialogComponent;
  let fixture: ComponentFixture<AddRecordDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecordDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecordDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
