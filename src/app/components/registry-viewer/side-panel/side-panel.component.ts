import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {DrawerService} from "../../../service/drawer.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  allPanelsExpanded = true;

  constructor(
    private sidenavService: DrawerService
  ) { }

  onClosePanel() {
    this.sidenavService.close();
  }

}

