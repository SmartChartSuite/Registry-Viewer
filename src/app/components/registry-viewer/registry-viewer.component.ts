import { Component, OnInit } from '@angular/core';
import {openAnnotationDialog} from "./annotation-dialog/annotation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs";
import {openDetailsDialog} from "./details-dialog/details-dialog.component";


@Component({
  selector: 'app-registry-viewer',
  templateUrl: './registry-viewer.component.html',
  styleUrls: ['./registry-viewer.component.css']
})
export class RegistryViewerComponent implements OnInit {

  breakpoint: number;
  matCardContentHeight: number;

  constructor(private dialog: MatDialog) {
  }

  setMatCardContentHeight(windowSize: number){
    if(windowSize <= 440){
      this.matCardContentHeight = 60;
    }
    else if(windowSize <= 1440){
      this.matCardContentHeight = 70;
    }
    else {
      this.matCardContentHeight = 80;
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


