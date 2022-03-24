import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-other-history',
  templateUrl: './other-history.component.html',
  styleUrls: ['./other-history.component.css', '../registry-viewer/registry-viewer.component.css']
})
export class OtherHistoryComponent implements OnInit {

  @Input() matCardContentHeight: number;

  constructor() { }

  ngOnInit(): void {
  }

  otherMedicalHistoryFormatted = [
    {
      "group": "Pregnancy Conditions",
      "values" : [
        {
          "date": "2022-01-04T05:00:00.000Z",
          "observation": "Last menstrual period start date",
          "value": "5/26/2021"
        }
      ],
    },
    {
      "group": "Pregnancy Observations",
      "values" : [
        {
          "date": "2022-01-04T05:00:00.000Z",
          "observation": "Last menstrual period start date",
          "value": "5/26/2021"
        },
        {
          "date": "2022-01-04T05:00:00.000Z",
          "observation": "Last menstrual period start date",
          "value": "5/26/2021"
        }
      ],
    }
  ];

}
5
