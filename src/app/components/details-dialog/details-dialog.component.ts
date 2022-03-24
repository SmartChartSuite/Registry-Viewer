import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-details-dialog',
  templateUrl: './details-dialog.component.html',
  styleUrls: ['./details-dialog.component.css']
})
export class DetailsDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private detailsData: any,
    private dialogRef: MatDialogRef<any>,
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}

export function openDetailsDialog(dialog: MatDialog, detailsData: any) {
  const config = new MatDialogConfig();

  config.autoFocus = true;

  config.data = {
    ...detailsData
  }
  const dialogRef = dialog.open(DetailsDialogComponent, config);

  return dialogRef.afterClosed();
}
