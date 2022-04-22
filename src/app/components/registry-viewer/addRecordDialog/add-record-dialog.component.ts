import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-addRecordDialog',
  templateUrl: './add-record-dialog.component.html',
  styleUrls: ['./add-record-dialog.component.css']
})
export class AddRecordDialogComponent implements OnInit {

  form = this.formBuilder.group({
    textValue: [this.annotationData.textValue, Validators.required],
    flag: [this.annotationData.flag, Validators.required],
  });

  dataSource = [];
  columnsToDisplay = ['flag', 'updated'];
  isAddAnnotationFormVisible = true;
  isExpandAllBtnVisible = true;

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

  expandAll() {
    this.dataSource.forEach((annotation: Annotation) => annotation.expanded = true);
    this.isExpandAllBtnVisible = false;
  }

  collapseAll() {
    this.dataSource.forEach((annotation: Annotation) => annotation.expanded = false);
    this.isExpandAllBtnVisible = true;
  }
}


export function openAnnotationDialog(dialog: MatDialog, annotationData: any) {
  const config = new MatDialogConfig();

  config.autoFocus = true;
  config.width = "40em"

  config.data = {
    ...annotationData
  }
  const dialogRef = dialog.open(AddRecordDialogComponent, config);

  return dialogRef.afterClosed();
}

export interface Annotation {
  flag: string;
  position: number;
  updated: string;
  textValue: string;
  expanded: boolean
}
