import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchTypeEnum} from "../case-explorer.component";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

export interface SearchResultFilter {
  filterByFormControl: 'filter'; //presently we only allow for one form control filter
  filterValue: string;
}

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss'
})
export class SearchFormComponent implements OnChanges{
  @Input() searchType!: SearchTypeEnum;
  @Output() onSearchEvent = new EventEmitter<any>();
  @Output() onFilterSearchResultsEvent = new EventEmitter<SearchResultFilter>();

  searchTypeEnum = SearchTypeEnum;
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
    if(changes['searchType'].currentValue == this.searchTypeEnum.QUERY_DATA){
      this.searchForm = this.formBuilder.group({
        'query': new FormControl(''),
        'dob': new FormControl(null),
        'filter': new FormControl(null),
      });

      // Presently we only filter the results from patient search
      this.searchForm.controls['filter'].valueChanges.subscribe(value => {
        this.onFilterSearchResultsEvent.emit({filterByFormControl: 'filter', filterValue: value});
      });
    }
    else if (changes['searchType'].currentValue == this.searchTypeEnum.PATIENT_SEARCH){
      this.searchForm = this.formBuilder.group({
        'query': new FormControl(''),
      })
    }
    if(this.searchForm?.controls){
      this.searchForm.valueChanges.subscribe(value => {
        console.log('Form value changed:', value);
        // Do something with the updated form value
      });
    }
  }


}
