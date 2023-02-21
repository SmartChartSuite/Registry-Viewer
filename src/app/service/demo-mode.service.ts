import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemoModeService {

  private isDemoModeActive = new BehaviorSubject<boolean>(false);
  isDemoModeActive$ = this.isDemoModeActive.asObservable();

  private latestDate = new BehaviorSubject<Date>(null);
  latestDate$ = this.latestDate.asObservable();

  private significantDateList = new BehaviorSubject<Date[]>(null);
  significantDateList$ = this.significantDateList.asObservable();

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

  setSignificantDateList(objectList: any){
    if(!objectList?.length){
      this.significantDateList.next([]);
    }
    else {
      const uniqueDatesSet: Set<Date> = new Set();
      objectList.forEach(entry => {
        if(entry.date) {
          // this code may be bug and error-prone since we are using a specific format for working with the dates.
          const date: Date = new Date(parseInt(entry.date, 10));
          uniqueDatesSet.add(date);
        }
      });
      const uniqueDatesList = Array.from(uniqueDatesSet);
      const sortedDatesList = uniqueDatesList.sort(function(a,b){
        return a.valueOf() - b.valueOf();
      });
      this.significantDateList.next(sortedDatesList);
    }
  }

  constructor() { }

}
