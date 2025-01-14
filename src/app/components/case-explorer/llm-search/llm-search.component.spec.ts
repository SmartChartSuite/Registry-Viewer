import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LlmSearchComponent } from './llm-search.component';

describe('LlmSearchComponent', () => {
  let component: LlmSearchComponent;
  let fixture: ComponentFixture<LlmSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LlmSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LlmSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
