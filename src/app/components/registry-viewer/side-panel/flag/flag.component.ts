import { Component, OnInit } from '@angular/core';
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  flagChecked: true;
  flag: string;

  constructor() { }

  ngOnInit(): void {
  }

  onFlagChanged($event: MatCheckboxChange) {
    console.log($event);
  }
}
