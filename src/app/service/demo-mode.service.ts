import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DemoModeService {

  private isDemoModeActive = new BehaviorSubject<boolean>(false);
  isDemoModeActive$ = this.isDemoModeActive.asObservable();

  private isChronologicalViewActive = new BehaviorSubject<boolean>(false);
  isChronologicalViewActive$ = this.isChronologicalViewActive.asObservable();

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

  setChronologicalViewActive (isActive: boolean): void {
    this.isChronologicalViewActive.next(isActive);
  }

  setSignificantDateList(objectList: any){
    if(!objectList?.length){
      this.significantDateList.next([]);
    }
    else {
      const uniqueDatesSet: Set<any> = new Set();
      objectList.forEach(entry => {
        if(entry.date) {
          uniqueDatesSet.add(entry.date);
        }
      });
      const uniqueDatesList = Array.from(uniqueDatesSet);
      const sortedDatesList = uniqueDatesList.sort(function(a,b){
        return a.valueOf() - b.valueOf();
      });
      const mappedList = sortedDatesList.map(date => new Date(parseInt(date, 10)));
      this.significantDateList.next(mappedList);
    }
  }

  constructor() { }

}
