import { Component, OnInit } from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {SidenavService} from "../../../../service/sidenav.service";
import {UtilsService} from "../../../../service/utils.service";

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  flagChecked: true;
  flag: string;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private route: ActivatedRoute,
    private sidenavService: SidenavService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
  }

  onFlagChanged($event: MatCheckboxChange) {
    console.log($event);
    const caseId =  this.route.snapshot.params['id'];
    let flagValue = '';
    // if($event.checked){
      flagValue = this.flag;
    //}
    const contentId = this.sidenavService.data$.getValue().contentId;
    this.caseRecordsService.updateCaseRecord(caseId, contentId,{'flag': flagValue}).subscribe(
      {
        next: value => this.utilsService.showErrorMessage("Flag updated successfully"),
        error: (err)=> {console.error(err); this.utilsService.showErrorMessage("Unable to upload the record. Server error.")}
      }
    );
  }
}
