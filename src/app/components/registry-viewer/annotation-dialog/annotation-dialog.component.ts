import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-annotation-dialog',
  templateUrl: './annotation-dialog.component.html',
  styleUrls: ['./annotation-dialog.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AnnotationDialogComponent implements OnInit {

  form = this.formBuilder.group({
    textValue: [this.annotationData.textValue, Validators.required],
    flag: [this.annotationData.flag, Validators.required],
  });

  dataSource = ANNOTATION_DATA;
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
  const dialogRef = dialog.open(AnnotationDialogComponent, config);

  return dialogRef.afterClosed();
}

export interface Annotation {
  flag: string;
  position: number;
  updated: string;
  textValue: string;
  expanded: boolean
}

const ANNOTATION_DATA: Annotation[] = [
  {
    position: 1,
    flag: 'One',
    updated: "2022-11-05T02:03:00Z",
    textValue: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    expanded: false
  },
  {
    position: 2,
    flag: 'Two',
    updated: "2022-12-05T02:03:00Z",
    textValue: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
    expanded: false
  },
  {
    position: 3,
    flag: 'Two',
    updated: "2023-01-05T02:03:00Z",
    textValue: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
    expanded: false
  },
  {
    position: 4,
    flag: 'Three',
    updated: "2023-12-05T02:03:00Z",
    textValue: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
    expanded: false
  },
  {
    position: 5,
    flag: 'One',
    updated: "2022-11-10T02:03:00Z",
    textValue: `Boron is a chemical element with symbol B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`,
    expanded: false
  },
  {
    position: 6,
    flag: 'Two',
    updated: "2022-10-08T02:03:00Z",
    textValue: `Carbon is a chemical element with symbol C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`,
    expanded: false
  },
  {
    position: 7,
    flag: 'Two',
    updated: "2023-01-05T02:03:00Z",
    textValue: `Nitrogen is a chemical element with symbol N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`,
    expanded: false
  },
  {
    position: 8,
    flag: 'One',
    updated: "2023-09-05T02:03:00Z",
    textValue: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
    expanded: false
  },
];
