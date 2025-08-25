import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSearchResultsComponent } from './patient-search-results.component';

describe('SearchResultsComponent', () => {
  let component: PatientSearchResultsComponent;
  let fixture: ComponentFixture<PatientSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
