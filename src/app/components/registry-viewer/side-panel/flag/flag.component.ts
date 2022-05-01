import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {SidenavService} from "../../../../service/sidenav.service";
import {UtilsService} from "../../../../service/utils.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  flagChecked: boolean;
  selectedEntry$: Observable<any>;
  selectedCaseRecord: any;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private route: ActivatedRoute,
    private sidenavService: SidenavService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.caseRecordsService.selectedCaseRecord$.subscribe(
      {next: value => this.selectedCaseRecord = value}
    );
  }

  onFlagChanged($event: MatCheckboxChange) {
    const caseId =  this.route.snapshot.params['id'];
    let flagValue = null;
    if($event.checked){
     flagValue = "Invalid Entry";
    }
    this.caseRecordsService.updateCaseRecord(caseId, this.selectedCaseRecord?.contentId,{'flag': flagValue}).subscribe(
      {
        next: value => this.utilsService.showSuccessMessage("Flag updated successfully"),
        error: (err)=> {console.error(err); this.utilsService.showErrorMessage("Unable to upload the record. Server error.")
        }
      }
    );
  }
}
