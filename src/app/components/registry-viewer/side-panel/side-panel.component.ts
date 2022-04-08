import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  allPanelsExpanded = true;

  constructor() { }

}

