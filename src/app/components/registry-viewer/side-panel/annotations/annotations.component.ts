import {Component, OnInit, ViewChild} from '@angular/core';
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {SidenavService} from "../../../../service/sidenav.service";
import {UtilsService} from "../../../../service/utils.service";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Annotation} from "../../../../model/annotation";



@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent implements OnInit {

  isAddAnnotationInputVisible = false;
  annotationList: Annotation []= [];
  form : FormGroup = new FormGroup({annotation: new FormControl('', [Validators.required])});
  selectedCaseRecord: any;
  selectedCaseRecordSubscription$: Subscription;
  submitted = false;

  @ViewChild('formDirective') formDirective: any;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private route: ActivatedRoute,
    private sidenavService: SidenavService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.selectedCaseRecordSubscription$ = this.caseRecordsService.selectedCaseRecord$.subscribe(
      { next: value => {
        this.selectedCaseRecord = value;
        this.annotationList = this.selectedCaseRecord?.annotation;
        this.formDirective?.resetForm();
        this.form?.reset();
        this.submitted = false;}}
    );
  }

  saveAnnotation(annotationText: string) {
    const caseId = this.route.snapshot.params['id'];

    const annotationObj = {
      "annotations": [
        {
          "text": annotationText
        }
      ]
    }

    this.caseRecordsService.updateCaseRecord(annotationObj, caseId, this.selectedCaseRecord?.contentId)
      .subscribe(
        {
          next: value => {
            this.utilsService.showSuccessMessage("Annotation updated successfully");
            this.form.reset();
            this.isAddAnnotationInputVisible = false;
            this.submitted = false;
          },
          error: (err) => {
            console.error(err);
            this.utilsService.showErrorMessage("Unable to upload the record. Server error.");
            this.form.reset();
            this.submitted = false;
          }
        }
      );
  }


  onSubmit() {
    this.submitted = true;
    if(this.form.valid){
      this.saveAnnotation(this.form.controls['annotation'].value);
    }
  }

  onCancelAddAnnotation() {
    this.submitted = false;
    this.form.reset();
    this.isAddAnnotationInputVisible = false;
  }
}
