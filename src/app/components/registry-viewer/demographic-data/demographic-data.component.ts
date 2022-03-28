import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-demographic-data',
  templateUrl: './demographic-data.component.html',
  styleUrls: ['./demographic-data.component.css']
})
export class DemographicDataComponent implements OnInit {
  @Input() demographicData: any;

  cols: number = 3;
  width: string = "8em";

  constructor(private responsive: BreakpointObserver) { }

  ngOnInit(): void {
    this.responsive.observe([
      Breakpoints.XSmall,
    ])
      .subscribe(result => {
        this.cols = 3;
        this.width = "8em";
        if (result.matches) {
          this.cols = 1;
          this.width = "6em";
        }
      });
  }

}
