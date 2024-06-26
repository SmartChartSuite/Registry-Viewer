import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {Question} from "../../../domain/question";
import {CaseRecordsService} from "../../../service/case-records.service";
import {UtilsService} from "../../../service/utils.service";

@Component({
  selector: 'app-add-record-dialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrls: ['./add-record-dialog.component.scss'],
})
export class AddRecordDialogComponent implements OnInit {

  form = this.formBuilder.group({
    value: ['', Validators.required],
    date: [new Date(), Validators.required],
    question: ['', Validators.required]
  });

  isAddAnnotationFormVisible = true;
  dialogTitle: string;
  questions: Question[];
  submitted = false;
  registrySchemaTag: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<any>,
    private caseRecordsService: CaseRecordsService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.setDialogTitle(this.data?.section);
    this.registrySchemaTag = this.data.registrySchemaTag;
    this.caseRecordsService.getQuestions(this.data?.section, this.registrySchemaTag).subscribe({
      next: value => this.questions = value,
      error: err => console.error(err)
    })
  }

  setDialogTitle(section: string): void{
    if(section === "Diagnoses"){
      this.dialogTitle = "Add Diagnosis";
    }
    else if(section === "Other Medical History" || !section){
      this.dialogTitle = "Add Record";
    }
    else {
      this.dialogTitle = "Add " +  section;
    }
  }

  close() {
    this.dialogRef.close();
    this.form.reset();
  }

  updateCaseRecord(keyValue: any): void{
    const caseId =  this.data.caseId;
    this.caseRecordsService.updateCaseRecord(this.registrySchemaTag, keyValue, caseId).subscribe({
      next: ()=> {
        this.submitted = false; this.utilsService.showSuccessMessage("Record updated successfully")
      },
      error: () => this.utilsService.showErrorMessage("Server Error. Unable to update record."),
    })
  }

  save() {
    this.submitted = true;
    this.form.markAllAsTouched();

    //TODO we may need to change this to a specific type and add a class to the domain
    if(this.form.valid){
      let keyValueData = {
        manualCaseData:
          [
            {
              conceptId: this.form.value.question.conceptId,
              date: this.form.value.date,
              value: this.form.value.value
            }
          ]
      };
      this.updateCaseRecord(keyValueData);
      this.close();
    }
  }

}

export function openAnnotationDialog(dialog: MatDialog, data: any) {
  const config = new MatDialogConfig();
  config.autoFocus = true;
  config.width = "40em";

  config.data = {
    ...data
  }
  const dialogRef = dialog.open(AddRecordDialogComponent, config);

  return dialogRef.afterClosed();
}
