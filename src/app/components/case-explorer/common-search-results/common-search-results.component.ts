import {Component, Input} from '@angular/core';
import {SearchTypeEnum} from "../case-explorer.component";
import {Router} from "@angular/router";
import {RegistrySchema} from "../../../domain/registry.schema";
import {CaseRecordApiResponse, QuerySearchApiResponse} from "../../../domain/case.record.api.response";

@Component({
  selector: 'app-common-search-results',
  templateUrl: './common-search-results.component.html',
  styleUrl: './common-search-results.component.scss'
})
export class CommonSearchResultsComponent{
  @Input() searchResults!: any;
  @Input() searchType!: SearchTypeEnum;
  @Input() selectedRegistrySchema: RegistrySchema;
  @Input() filterStr: string;

  protected readonly SearchTypeEnum = SearchTypeEnum;
  @Input() patientSearchResults: CaseRecordApiResponse;
  @Input() populationSearchResults: QuerySearchApiResponse;


  constructor(private router: Router,) {
  }

  patientSelected(event: any) {
    this.router.navigate(['case', event.caseId], { queryParams: {registrySchema: this.selectedRegistrySchema.tag}} );
  }

}
