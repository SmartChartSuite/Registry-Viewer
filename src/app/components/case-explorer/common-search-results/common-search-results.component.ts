import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {RegistrySchema} from "../../../domain/registry.schema";
import {SearchTypeEnum} from "../../../domain/search-type";
import {CaseRecordApiResponse, QuerySearchApiResponse} from "../../../domain/case.record.api.response";

@Component({
  selector: 'app-common-search-results',
  templateUrl: './common-search-results.component.html',
  styleUrl: './common-search-results.component.scss',
  standalone: false
})
export class CommonSearchResultsComponent{
  @Input() searchResults!: any;
  @Input() searchType!: SearchTypeEnum;
  @Input() selectedRegistrySchema: RegistrySchema;
  @Input() filterStr: string;
  @Input() patientSearchResults: CaseRecordApiResponse;
  @Input() populationSearchResults: QuerySearchApiResponse;

  protected readonly SearchTypeEnum = SearchTypeEnum;

  constructor(private router: Router,) {}

  patientSelected(event: any) {
    this.router.navigate(['case', event.caseId], { queryParams: {registrySchema: this.selectedRegistrySchema.tag}} );
  }

}
