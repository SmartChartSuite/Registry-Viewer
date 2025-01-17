import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmPopulationSearchComponent } from './llm-population-search.component';

describe('LlmSearchComponent', () => {
  let component: LlmPopulationSearchComponent;
  let fixture: ComponentFixture<LlmPopulationSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmPopulationSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmPopulationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
