import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css',  '../registry-viewer/registry-viewer.component.css']
})
export class TreatmentComponent implements OnInit {

  @Input() matCardContentHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

  treatments = [

    {
      "group": "",
      "date": "2021-07-10T04:00:00.000Z",
      "medication": "Penicillin G",
      "dose": "2.4M Units"
    },
    {
      "group": "",
      "date": "2022-01-04T05:00:00.000Z",
      "medication": "Penicillin G",
      "dose": "2.4M Units"
    }
  ];

}
