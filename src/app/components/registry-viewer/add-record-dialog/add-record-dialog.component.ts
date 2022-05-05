import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-record-dialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrls: ['./add-record-dialog.component.css']
})
export class AddRecordDialogComponent implements OnInit {

  form = this.formBuilder.group({
    textValue: [this.annotationData.textValue, Validators.required],
    flag: [this.annotationData.flag, Validators.required],
  });

  isAddAnnotationFormVisible = true;
  dialogTitle: string;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private annotationData: any,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
    this.setDialogTitle(this.annotationData?.section);
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
  }

  save() {
    this.dialogRef.close(this.form.value);
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
