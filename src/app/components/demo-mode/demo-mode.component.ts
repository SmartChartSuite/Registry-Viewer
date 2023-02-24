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
      let offset = 7;
      let resultingDate = currentDate;
      if (operation == Operations.NEXT && this.form.valid) {
        resultingDate = new Date(currentDate.setDate(resultingDate.getDate() + offset));
      }
      else if (operation == Operations.PREVIOUS && this.form.valid) {
        resultingDate = new Date(currentDate.setDate(resultingDate.getDate() - offset));
      }
      else if (operation == Operations.FF && this.significantDateList?.length > 1) {
        resultingDate = this.significantDateList.find(date => date > currentDate);
      }
      else if (operation == Operations.REW && this.significantDateList?.length > 1) {
        const reversed = [...this.significantDateList].reverse();
        resultingDate = reversed.find(date => date < currentDate);
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
    if(this.form.controls['latestDate'].value.getTime() < this.significantDateList[this.significantDateList.length -1].getTime()){
      return true;
    }
    return false;
  }

  isPreviousEnabled(): boolean {
    if(!this.significantDateList?.length || this.significantDateList?.length == 1 || !this.form.valid){
      return false;
    }
    if(this.form.controls['latestDate'].value.getTime() > this.significantDateList[0].getTime()){
      return true;
    }
    return false;
  }

}
