import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {LlmResponse} from "../../../../domain/llm-response";

@Component({
  selector: 'app-llm-search-results',
  standalone: false,
  templateUrl: './llm-search-results.component.html',
  styleUrl: './llm-search-results.component.scss'
})
export class LlmSearchResultsComponent implements OnChanges{
  @Input() searchResults!: LlmResponse;

  ngOnChanges(changes: SimpleChanges): void {

  }


  protected readonly Object = Object;
}
