import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {QuerySearchApiResponse} from "../../../domain/case.record.api.response";

@Component({
  selector: 'app-query-search-results',
  templateUrl: './query-search-results.component.html',
  styleUrl: './query-search-results.component.scss'
})
export class QuerySearchResultsComponent implements OnChanges{
  @Input() searchResults!: QuerySearchApiResponse;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  protected readonly Object = Object;
}
