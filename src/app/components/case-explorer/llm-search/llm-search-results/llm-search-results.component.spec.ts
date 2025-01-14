import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmSearchResultsComponent } from './llm-search-results.component';

describe('LlmSearchResultsComponent', () => {
  let component: LlmSearchResultsComponent;
  let fixture: ComponentFixture<LlmSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmSearchResultsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
