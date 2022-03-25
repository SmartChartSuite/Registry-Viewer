import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-diagnostics',
  templateUrl: './diagnostics.component.html',
  styleUrls: ['./diagnostics.component.css', '../registry-viewer.component.css']
})
export class DiagnosticsComponent implements OnInit {

  @Input() matCardContentHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

  diagnosesFormatted = [
    {
      "group": "Syphilis",
      "values" : [
        {
          "date": "2022-01-04T05:00:00.000Z",
          "condition": "Primary genital syphilis"
        }
      ],
    },
    {
      "group": "Related Conditions",
      "values" : [
        {
          "date": "2015-07-19T04:00:00.000Z",
          "condition": "Chlamydial infection of genitourinary tract, unspecified"
        },
        {
          "date": "2016-08-19T04:00:00.000Z",
          "condition": "Chlamydial infection of genitourinary tract, unspecified"
        },
        {
          "date": "2016-08-19T04:00:00.000Z",
          "condition": "Chlamydial infection of genitourinary tract, unspecified"
        },
        {
          "date": "2016-08-19T04:00:00.000Z",
          "condition": "Gonococcal infection, unspecified"
        },

      ],
    }
  ];


}
