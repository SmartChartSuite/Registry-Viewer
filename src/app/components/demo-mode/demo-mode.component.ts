import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DemoModeService} from "../../service/demo-mode.service";

@Component({
  selector: 'app-demo-mode',
  templateUrl: './demo-mode.component.html',
  styleUrls: ['./demo-mode.component.css']
})
export class DemoModeComponent implements OnInit {

  form = new FormGroup({
    latestDate: new FormControl(new Date(),[Validators.required]),
  });
  count: number = 0;

  constructor( private demoModeService: DemoModeService ) { }

  ngOnInit(): void {
    this.demoModeService.recordsCount$.subscribe({ next: value => this.count = value})
  }

  onChangeDate(numberOdDays: number){
    if (this.form.valid) {
      const selectedDate = this.form.controls['latestDate'].value;
      const resultDate = new Date(selectedDate.setDate(selectedDate.getDate() + numberOdDays));
      this.form.controls['latestDate'].patchValue(resultDate);
      this.demoModeService.setLatestDate(resultDate);
    }
  }

}
