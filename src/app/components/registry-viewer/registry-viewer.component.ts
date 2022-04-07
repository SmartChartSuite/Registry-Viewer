import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatAccordion} from "@angular/material/expansion";
import {FormBuilder, Validators} from "@angular/forms";
import {Annotation} from "./annotation-dialog/annotation-dialog.component";


@Component({
  selector: 'app-registry-viewer',
  templateUrl: './registry-viewer.component.html',
  styleUrls: ['./registry-viewer.component.css']
})
export class RegistryViewerComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  breakpoint: number;
  matCardContentHeight: number;
  private annotationData: any;

  //TODO this data should be retrieved from the backend
  demographicData = {
    address:  {
      street: "7985 Waxwing Pass",
      city: "Columbus",
      state: "OH",
      zip: "87913"
    },
    phone: "770-123-9876",
    dob: "Dec 31, 1923",
    gender: "other"
  }

  isDefaultViewActive = true;
  panelOpenState = false;
  isExpandAllBtnVisible = true;
  columnsToDisplay = ['flag', 'updated'];
  dataSource = ANNOTATION_DATA;
  constructor(private dialog: MatDialog) {
  }

  setMatCardContentHeight(windowSize: number){
    if(windowSize <= 1440){
      this.matCardContentHeight = 60;
    }
    else {
      this.matCardContentHeight = 70;
    }
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 992) ? 1 : 2;
    this.setMatCardContentHeight(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth<= 992) ? 1 : 2;
    this.setMatCardContentHeight(window.innerWidth);
  }
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
  }
];


