import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SearchApiOptionsEnum} from "../../../domain/search-api-options";
import {SearchTypeEnum} from "../../../domain/search-type";
import {Search} from "../../../domain/search";


@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
  standalone: false
})
export class SearchFormComponent implements OnChanges{
  @Input() searchType!: SearchTypeEnum;
  @Output() onSearchEvent = new EventEmitter<Search>();
  @Output() onFilterSearchResultsEvent = new EventEmitter<string>();
  @Output() onApiOptionsChangeEvent = new EventEmitter<any>();
  @Output() onCancelRequest = new EventEmitter<void>();
  @Input() isLoading!: boolean;

  protected readonly Object = Object;
  protected readonly searchTypeEnum = SearchTypeEnum;
  protected readonly apiOptionsEnum = SearchApiOptionsEnum;

  searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ){
  }

  onClear() {
    this.searchForm.controls['query'].setValue('');
  }
  
  onSearch() {
    this.onSearchEvent.emit({searchType: this.searchType, queryStr: this.searchForm.value['query'], apiOption: this.searchForm.value['apiOptions']});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchType']?.currentValue == this.searchTypeEnum.population){
      this.searchForm = this.formBuilder.group({
        'query': new FormControl(''),
      });
    }
    else if (changes['searchType']?.currentValue == this.searchTypeEnum.patient){
      this.searchForm = this.formBuilder.group({
        'query': new FormControl(''),
        'filter': new FormControl(null),
        'apiOptions': new FormControl(this.apiOptionsEnum.TRADITIONAL) // the value type (string) should match
      });
      // Presently we only filter the results from patient search
      this.searchForm.controls['filter'].valueChanges.subscribe(() => {
        this.onFilterSearchResultsEvent.emit(this.searchForm.controls['filter'].value);
      });
      this.searchForm.controls['apiOptions'].valueChanges.subscribe(() => {
        this.searchForm.controls['query'].setValue('');
        this.searchForm.controls['filter'].setValue('');
        this.onApiOptionsChangeEvent.emit(this.searchForm.value['apiOptions']);
      });
    }
  }
}
