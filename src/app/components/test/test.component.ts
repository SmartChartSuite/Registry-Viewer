import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number;
  descriptions: string[];
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  displayedColumns = [ "name", "descriptions"];

  dataSource = formattedData;

  labResults3 = [
    {
      "group": "syphilis",
      "results" : [
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
        }
      ],
    },
    {
      "group": "hiv",
      "results" : [
        {
          "date": "2022-01-14T05:00:00.000Z",
          "test": "HIV 1+2 Ab [Presence] in Serum",
          "result": "Negative"
        }
      ],
    },

  ]

  dataList = [
    {
      pname: "abc",
      numbers: [123, 234]
    },
    {
      pname: "mno",
      numbers: [125,  237]
    }
  ]



  rowSpanData = [2, 3, 2, 3, 1, 3, 1, 1, 3, 3]

  constructor() { }

  ngOnInit(): void {
  }



}

const originalData = [
  {  name: 'Hydrogen', descriptions: ['row1', 'row2'] },
  {  name: 'Helium',  descriptions: ['row1', 'row2'] },
  {  name: 'Lithium',  descriptions: ['row1', 'row2'] },
  {  name: 'Beryllium', descriptions: ['row1', 'row2'] },
  {  name: 'Boron',  descriptions: ['row1', 'row2'] },
  {  name: 'Carbon',  descriptions: ['row1', 'row2'] },
  {  name: 'Nitrogen',  descriptions: ['row1', 'row2'] },
  {  name: 'Oxygen',  descriptions: ['row1', 'row2'] },
  {  name: 'Fluorine',  descriptions: ['row1', 'row2'] },
  {  name: 'Neon',  descriptions: ['row1', 'row2'] },
]

const rowSpanData = [2, 3, 2, 3, 1, 3, 1, 1, 3, 3]

const formattedData = [
  {
    "name": "Hydrogen",
    "description": "row1"
  },
  {
    "description": "row2"
  },
  {
    "name": "Hydrogen",
    "description": "row1"
  },
  {
    "description": "row2"
  },
  {
    "name": "Lithium",
    "description": "row1"
  },
  {
    "description": "row2"
  },
  {
    "name": "Beryllium",
    "description": "row1"
  },
  {
    "description": "row2"
  },
  {
    "name": "Boron",
    "description": "row1"
  },
  {
    "description": "row2"
  },
  {
    "name": "Carbon",
    "description": "row1"
  },
  {
    "description": "row2"
  },
]
