import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SearchApiOptionsEnum, SearchTypeEnum} from "../case-explorer.component";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

export interface SearchResultFilter {
  filterByFormControl: 'filter'; //presently we only allow for one form control filter
  filterValue: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  standalone: false
})
export class SearchFormComponent implements OnChanges{
  @Input() searchType!: SearchTypeEnum;
  @Output() onSearchEvent = new EventEmitter<any>();
  @Output() onFilterSearchResultsEvent = new EventEmitter<string>();
  @Output() onApiOptionsChangeEvent = new EventEmitter<any>();

  protected readonly Object = Object;

  protected readonly searchTypeEnum = SearchTypeEnum;
  protected readonly apiOptionsEnum = SearchApiOptionsEnum;
  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
  }

  onClear() {
    this.searchForm.reset();
    this.onSearch()
  }

  onSearch() {
    this.onSearchEvent.emit({searchType: this.searchType, searchFormValue: this.searchForm.value});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchType'].currentValue == this.searchTypeEnum.POPULATION_SEARCH){
      this.searchForm = this.formBuilder.group({
        'query': new FormControl(''),
      });
    }
    else if (changes['searchType'].currentValue == this.searchTypeEnum.PATIENT_SEARCH){
      this.searchForm = this.formBuilder.group({
        'query': new FormControl(''),
        'filter': new FormControl(null),
        'apiOptions': new FormControl(this.apiOptionsEnum.TRADITIONAL) // the value type (string) should match
      });
      // Presently we only filter the results from patient search
      this.searchForm.controls['filter'].valueChanges.subscribe(value => {
        this.onFilterSearchResultsEvent.emit(this.searchForm.controls['filter'].value);
      });
      this.searchForm.controls['apiOptions'].valueChanges.subscribe(value => {
        this.searchForm.controls['query'].setValue('');
        this.searchForm.controls['filter'].setValue('');
        this.onApiOptionsChangeEvent.emit(this.searchForm.value);
      });
    }
  }
}
