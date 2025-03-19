import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SearchHistory} from "../../../domain/search-history";

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.scss',
  standalone: false
})
export class SearchHistoryComponent {
  @Input() searchHistory!: SearchHistory[];
  @Output() onSearchHistorySelected = new EventEmitter<SearchHistory>();

  protected readonly history = history;
  expanded = false;

  onHistorySelected(element: SearchHistory) {
    this.onSearchHistorySelected.emit(element);
  }
}
