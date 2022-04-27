import { Component, OnInit } from '@angular/core';
import {SidenavService} from "../../../../service/sidenav.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor (private sidenavService: SidenavService,) { }

  details$: Observable<any>;

  ngOnInit(): void {
    this.details$ = this.sidenavService.data$
  }

}
