import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-flag',
  templateUrl: './flag.component.html',
  styleUrls: ['./flag.component.css']
})
export class FlagComponent implements OnInit {

  selectedFlag: string;
  flagList: string[] = ['One', 'Two', 'Three', 'Review'];

  constructor() { }

  ngOnInit(): void {
  }

}
