import {Component, OnInit, ViewChild} from '@angular/core';
import {CaseRecordsService} from "../../../../service/case-records.service";
import {ActivatedRoute} from "@angular/router";
import {DrawerService} from "../../../../service/drawer.service";
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
  selectedAnnotation: Annotation;

  @ViewChild('formDirective') formDirective: any;

  constructor(
    private caseRecordsService: CaseRecordsService,
    private route: ActivatedRoute,
    private sidenavService: DrawerService,
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

  saveAnnotation(annotation: any, operation: string) {
    const caseId = this.route.snapshot.params['id'];

    const annotationObj = {
      "annotations": [
        annotation
      ]
    }

    this.caseRecordsService.updateCaseRecord(annotationObj, caseId, this.selectedCaseRecord?.contentId)
      .subscribe(
        {
          next: value => {
            let successMessageStr: string = "";
            if(operation === "delete"){
              successMessageStr = "Annotation deleted successfully."
            }
            else if(operation === "create"){
              successMessageStr = "Annotation created successfully."
            }
            else if(operation === "update"){
              successMessageStr = "Annotation updated successfully."
            }
            this.utilsService.showSuccessMessage(successMessageStr);
            //this.form.reset();
            this.formDirective?.resetForm();
            this.submitted = false;
            this.selectedAnnotation = null;
          },
          error: (err) => {
            console.error(err);
            this.utilsService.showErrorMessage("Unable to upload the record. Server error.");
            this.form.reset();
            this.submitted = false;
          },
        }
      );
  }


  onSubmit() {
    this.submitted = true;
    if(this.form.valid){
      let annotation: any = {};
      let operation: string;
      if(this.selectedAnnotation?.annotationId){
        annotation.annotationId = this.selectedAnnotation.annotationId;
        annotation.text = this.form.controls['annotation'].value;
        operation = "update";
      }
      else {
        annotation = {text: this.form.controls['annotation'].value};
        operation = "create";
      }
      this.saveAnnotation(annotation, operation);
    }
  }

  onCancelAddAnnotation() {
    this.submitted = false;
    this.form.reset();
    this.isAddAnnotationInputVisible = false;
    this.selectedAnnotation = null;
  }

  onDeleteAnnotation(annotation){
    let annotationObj: any = {};
    annotationObj.annotationId = annotation.annotationId
    annotationObj.text = '';
    this.saveAnnotation(annotationObj, "delete");
  }

  onEditAnnotation(annotation: Annotation) {
    this.isAddAnnotationInputVisible = true;
    this.selectedAnnotation = annotation;
    this.form.controls['annotation'].patchValue(annotation.text);
  }

  onAddAnnotation() {
    this.isAddAnnotationInputVisible = true;
    this.selectedAnnotation = null;
    this.formDirective?.resetForm();
  }
}
