import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LlmSearchService} from "../../../service/llm-search.service";

@Component({
  selector: 'app-llm-population-search',
  standalone: false,
  templateUrl: './llm-population-search.component.html',
  styleUrl: './llm-population-search.component.scss'
})
export class LlmPopulationSearchComponent {
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  searchResults: any;

  constructor(private llmSearchService: LlmSearchService) { }

  onClear(){
    this.searchForm.reset();
    this.searchResults = null;
  }

  onSearch() {
    console.log(this.searchForm);
    this.llmSearchService.getLLMResponse(this.searchForm.controls['query'].value).subscribe({
      next: response => { this.searchResults = response },
      error: error => console.log(error)
    })
  }
}
