import { Injectable } from '@angular/core';
import {BehaviorSubject, last, Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemoModeService {

  private isDemoModeActive = new Subject<boolean>();
  isDemoModeActive$ = this.isDemoModeActive.asObservable();

  private latestDate = new BehaviorSubject<Date>(null);
  latestDate$ = this.latestDate.asObservable();

  private recordsCount = new BehaviorSubject<number>(0);
  recordsCount$ = this.recordsCount.asObservable();

  setDemoModeActive(isActive: boolean): void {
    this.isDemoModeActive.next(isActive);
  }

  setLatestDate(latestDate: Date): void {
    this.latestDate.next(latestDate);
  }

  setRecordsCount(count: number): void {
    this.recordsCount.next(count);
  }

  constructor() { }

}
