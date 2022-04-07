import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronologicalViewComponent } from './chronological-view.component';

describe('ChronologicalViewComponent', () => {
  let component: ChronologicalViewComponent;
  let fixture: ComponentFixture<ChronologicalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChronologicalViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChronologicalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
