import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DemoModeService} from "../../service/demo-mode.service";
import {DateAdapter, MAT_DATE_FORMATS} from "@angular/material/core";
import {APP_DATE_FORMATS, AppDateAdapter} from "../../provider/format-datepicker";

export enum Operations {
  FF = 'FF',
  REW = 'REW',
  NEXT = 'NEXT',
  PREVIOUS = 'PREVIOUS',
}

@Component({
  selector: 'app-demo-mode',
  templateUrl: './demo-mode.component.html',
  styleUrls: ['./demo-mode.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class DemoModeComponent implements OnInit {
  Operations = Operations;
  operation: Operations;
  form = new FormGroup({
    latestDate: new FormControl([Validators.required]),
  });
  count: number = 0;
  significantDateList: Date[];
  currentIndex = null;

  constructor( private demoModeService: DemoModeService) { }

  ngOnInit(): void {
    this.demoModeService.recordsCount$.subscribe({next: value => this.count = value});
    this.demoModeService.significantDateList$.subscribe({
      next: value => {
        this.significantDateList = value;
        const lastSignificantDate = this.significantDateList?.[this.significantDateList.length - 1];
        if(lastSignificantDate && !(this.form.controls['latestDate'].value instanceof Date)){
          this.form.controls['latestDate'].patchValue(lastSignificantDate);
        }
      }
    });
  }

  onChangeDate(operation?: Operations) {
    if (this.form.valid) {
      const currentDate = this.form.controls['latestDate'].value;
      let resultingDate = currentDate;
      const offset = 7; // one week offset
      if (operation == Operations.NEXT && this.form.valid) {
        // Advance by the number of days in offset
        resultingDate = new Date(currentDate.setDate(resultingDate.getDate() + offset));
      }
      else if (operation == Operations.PREVIOUS && this.form.valid) {
        // Go back by the number of days in the offset
        resultingDate = new Date(currentDate.setDate(resultingDate.getDate() - offset));
      }
      else if (operation == Operations.FF && this.significantDateList?.length > 0) {
        if ((!this.currentIndex && !(this.currentIndex == 0))
          || this.currentIndex >= (this.significantDateList?.length - 1)) {
          this.currentIndex = this.significantDateList?.length - 1
        }
        else if (this.currentIndex == this.significantDateList?.length || this.currentIndex >= 0) {
          this.currentIndex = this.currentIndex + 1;
        }
        resultingDate = this.significantDateList[this.currentIndex];
      }
      else if (operation == Operations.REW && this.significantDateList?.length > 0 && this.currentIndex != 0) {
        if (!this.currentIndex) {
          //get the last index from the significantDateList array
          this.currentIndex = ((this.significantDateList?.length) - 1) - 1;
        }
        else {
          this.currentIndex = this.currentIndex - 1;
        }
        resultingDate = this.significantDateList[this.currentIndex];
      }
      if(!operation){ //User enter date manually
        this.demoModeService.setLatestDate(this.form.controls['latestDate'].value);
      }
      this.form.controls['latestDate'].patchValue(resultingDate);
      this.demoModeService.setLatestDate(resultingDate);
    }
  }

  isNextEnabled(): boolean {
    if(!this.significantDateList?.length || this.significantDateList?.length == 1 || !this.form.valid) {
      return false;
    }
    if(this.significantDateList[this.significantDateList.length -1].getTime() <= this.form.controls['latestDate'].value.getTime()){
      return false;
    }
    return true;
  }

  isPreviousEnabled(): boolean {
    if(!this.significantDateList?.length || this.significantDateList?.length == 1 || !this.form.valid){
      return false;
    }
    if(this.significantDateList[0].getTime() >= this.form.controls['latestDate'].value.getTime()){
      return false;
    }
    return true;
  }

  onDateChanged() {
    console.log("change");
  }
}
