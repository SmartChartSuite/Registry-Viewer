import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LlmSearchService} from "../../../service/llm-search.service";

@Component({
  selector: 'app-llm-search',
  standalone: false,
  templateUrl: './llm-search.component.html',
  styleUrl: './llm-search.component.scss'
})
export class LlmSearchComponent {
  searchForm = new FormGroup({
    query: new FormControl(''),
  });

  searchResults: any;

  constructor(private llmSearchService: LlmSearchService) { }

  onSearch() {
    console.log(this.searchForm);
    this.llmSearchService.getLLMResponse(this.searchForm.controls['query'].value).subscribe({
      next: response => { this.searchResults = response },
      error: error => console.log(error)
    })
  }
}
