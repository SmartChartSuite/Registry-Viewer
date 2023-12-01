import {Component, Input, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {DrawerService} from "../../../service/drawer.service";

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
  @Input() registrySchemaTag: string;

  @ViewChild(MatAccordion) accordion: MatAccordion;
  allPanelsExpanded = true;

  constructor(
    private sidenavService: DrawerService
  ) { }

  onClosePanel() {
    this.sidenavService.close();
  }

}

