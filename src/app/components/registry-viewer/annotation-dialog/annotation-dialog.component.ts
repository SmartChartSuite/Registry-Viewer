import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-annotation-dialog',
  templateUrl: './annotation-dialog.component.html',
  styleUrls: ['./annotation-dialog.component.css']
})
export class AnnotationDialogComponent implements OnInit {
  form = this.formBuilder.group({
    description: [this.annotationData.description, Validators.required],
    category: [this.annotationData.category, Validators.required],
  });

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) private annotationData: any,
              private dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.value);
  }
}


export function openAnnotationDialog(dialog: MatDialog, annotationData: any) {
  const config = new MatDialogConfig();

  config.autoFocus = true;
  config.width = "40em"

  config.data = {
    ...annotationData
  }
  const dialogRef = dialog.open(AnnotationDialogComponent, config);

  return dialogRef.afterClosed();
}
