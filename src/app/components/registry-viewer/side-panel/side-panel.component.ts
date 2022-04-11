import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {SidenavService} from "../../../service/sidenav.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.css']
})
export class SidePanelComponent {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  allPanelsExpanded = true;

  constructor(
    private sidenavService: SidenavService
  ) { }

  onClosePanel() {
    this.sidenavService.close();
  }
}

