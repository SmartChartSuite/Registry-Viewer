import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DemoModeService} from "../../service/demo-mode.service";
import {UtilsService} from "../../service/utils.service";

export enum Operations {
  FF = 'FF',
  REW = 'REW',
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
}

@Component({
  selector: 'app-demo-mode',
  templateUrl: './demo-mode.component.html',
  styleUrls: ['./demo-mode.component.css']
})
export class DemoModeComponent implements OnInit {
  Operations = Operations;
  operation: Operations;
  form = new FormGroup({
    latestDate: new FormControl(new Date,[Validators.required]),
  });
  count: number = 0;
  significantDateList: Date[];
  currentIndex = null;

  constructor( private demoModeService: DemoModeService, private utilsService: UtilsService ) { }

  ngOnInit(): void {
    this.demoModeService.recordsCount$.subscribe({next: value => this.count = value});
    this.demoModeService.significantDateList$.subscribe({
      next: value => {
        this.significantDateList = value;
      }
    });
  }

  onChangeDate(operation: Operations) {
    if (this.form.valid) {
      const currentDate = this.form.controls['latestDate'].value;
      let resultingDate = currentDate;
      let offset = 0;
      if (operation == Operations.NEXT && this.form.valid) {
        offset = 7;
        resultingDate = new Date(currentDate.setDate(resultingDate.getDate() + offset));
      } else if (operation == Operations.PREVIOUS && this.form.valid) {
        offset = -7;
        resultingDate = new Date(currentDate.setDate(resultingDate.getDate() + offset));
      } else if (operation == Operations.FF && this.significantDateList?.length > 0) {
        if ((!this.currentIndex && !(this.currentIndex == 0))
          || this.currentIndex >= (this.significantDateList?.length - 1)) {
          this.currentIndex = this.significantDateList?.length - 1
        } else if (this.currentIndex == this.significantDateList?.length || this.currentIndex >= 0) {
          this.currentIndex = this.currentIndex + 1;
        }
        resultingDate = this.significantDateList[this.currentIndex];
      } else if (operation == Operations.REW && this.significantDateList?.length > 0 && this.currentIndex != 0) {
        if (!this.currentIndex) {
          this.currentIndex = ((this.significantDateList?.length) - 1) - 1;
        } else {
          this.currentIndex = this.currentIndex - 1;
        }
        resultingDate = this.significantDateList[this.currentIndex];
      }
      this.form.controls['latestDate'].patchValue(resultingDate);
      this.demoModeService.setLatestDate(resultingDate);
    }
  }

}
