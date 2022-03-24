import { Component, OnInit } from '@angular/core';
import {openAnnotationDialog} from "../annotation-dialog/annotation-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {filter} from "rxjs";
import {openDetailsDialog} from "../details-dialog/details-dialog.component";


@Component({
  selector: 'app-registry-viewer',
  templateUrl: './registry-viewer.component.html',
  styleUrls: ['./registry-viewer.component.css']
})
export class RegistryViewerComponent implements OnInit {

  breakpoint: number;
  matCardContentHeight: number;

  constructor(private dialog: MatDialog) {
  }

  setMatCardContentHeight(windowSize: number){
    if(windowSize <= 440){
      this.matCardContentHeight = 60;
    }
    else if(windowSize <= 1440){
      this.matCardContentHeight = 70;
    }
    else {
      this.matCardContentHeight = 80;
    }
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 992) ? 1 : 2;
    this.setMatCardContentHeight(event.target.innerWidth);
  }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth<= 992) ? 1 : 2;
    this.setMatCardContentHeight(window.innerWidth);
  }

  onEditAnnotation(value: any): void {
    openAnnotationDialog(this.dialog, {category: "One", description: "Sample annotation text"})
      .pipe(filter(val => !!val))
      .subscribe(
        val=> console.log(val)
      )
  }

  onViewDetails(value: any): void {
    openDetailsDialog(this.dialog, {key: "value"})
      .subscribe(
        val=> console.log(val)
      )
  }


  otherMedicalHistory: [
    {
      "group": "Pregnancy Conditions",
      "date": "2022-01-04T05:00:00.000Z",
      "condition": "32 weeks gestation of pregnancy"
    },
    {
      "group": "Pregnancy Observations",
      "date": "2022-01-04T05:00:00.000Z",
      "observation": "Last menstrual period start date",
      "value": "5/26/2021"
    },
    {
      "group": "Pregnancy Observations",
      "date": "2022-01-04T05:00:00.000Z",
      "observation": "Urine HCG",
      "value": "Positive"
    },
    {
      "group": "Symptoms",
      "date": "2021-07-10T04:00:00.000Z",
      "Symptom": "Lymphadenopathy"
    }
  ];

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

  diagnoses: [
    {
      "group": "Syphilis",
      "date": "2022-01-04T05:00:00.000Z",
      "condition": "Primary genital syphilis"
    },
    {
      "group": "Related Conditions",
      "date": "2015-07-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified"
    },
    {
      "group": "Related Conditions",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Chlamydial infection of genitourinary tract, unspecified"
    },
    {
      "group": "Related Conditions",
      "date": "2015-07-19T04:00:00.000Z",
      "condition": "Gonococcal infection, unspecified"
    },
    {
      "group": "Related Conditions",
      "date": "2016-08-19T04:00:00.000Z",
      "condition": "Gonococcal infection, unspecified"
    }
  ];

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


  labResultsFormatted = [
    {
      "group": "Syphilis",
      "values" : [
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "Reagin Ab [Presence] in Serum by RPR",
          "result": "Reactive"
        },
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "Reagin Ab [Titer] in Serum by RPR",
          "result": "1:4"
        },
        {
          "date": "2021-07-10T04:00:00.000Z",
          "test": "Reagin Ab [Titer] in Serum by RPR",
          "result": "1:64"
        },
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "Reagin Ab [Presence] in Serum by RPR",
          "result": "Reactive"
        },
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "Reagin Ab [Titer] in Serum by RPR",
          "result": "1:4"
        },
        {
          "date": "2021-07-10T04:00:00.000Z",
          "test": "Reagin Ab [Titer] in Serum by RPR",
          "result": "1:64"
        },
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "Reagin Ab [Presence] in Serum by RPR",
          "result": "Reactive"
        },
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "Reagin Ab [Titer] in Serum by RPR",
          "result": "1:4"
        }
      ],
    },
    {
      "group": "HIV",
      "values" : [
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "HIV 1+2 Ab [Presence] in Serum",
          "result": "Negative"
        },
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "HIV 1+2 Ab [Presence] in Serum",
          "result": "Negative"
        }
      ],
    },

  ]


}


