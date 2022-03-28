import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-demographic-data',
  templateUrl: './demographic-data.component.html',
  styleUrls: ['./demographic-data.component.css']
})
export class DemographicDataComponent implements OnInit {
  @Input() demographicData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
