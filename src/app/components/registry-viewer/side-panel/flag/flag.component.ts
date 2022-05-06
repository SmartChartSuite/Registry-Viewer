import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {DrawerService} from "../../../../service/drawer.service";
import {UtilsService} from "../../../../service/utils.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit, OnDestroy {

  selectedCaseRecord: any;
  selectedCaseRecordSubscription$: Subscription;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private route: ActivatedRoute,
    private sidenavService: DrawerService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.selectedCaseRecordSubscription$ = this.caseRecordsService.selectedCaseRecord$.subscribe(
      {next: value => this.selectedCaseRecord = value}
    );
  }

  onFlagChanged($event: MatCheckboxChange) {
    const caseId =  this.route.snapshot.params['id'];
    let flagValue = null;
    if($event.checked){
     flagValue = "Invalid Entry";
    }
    this.caseRecordsService.updateCaseRecord({'flag': flagValue}, caseId, this.selectedCaseRecord?.contentId).subscribe(
      {
        next: value => this.utilsService.showSuccessMessage("Flag updated successfully"),
        error: (err)=> {console.error(err); this.utilsService.showErrorMessage("Unable to upload the record. Server error.")
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.selectedCaseRecordSubscription$.unsubscribe();
  }
}
