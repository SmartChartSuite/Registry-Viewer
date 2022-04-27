import { Injectable } from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidenav: MatSidenav;

  data: any;
  data$: BehaviorSubject<any>;

  constructor(
  ) {
    this.data$ = new BehaviorSubject(this.data);
  }

  public setSidenavData(data: any){
    this.data$.next(data);
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenav.toggle();
  }
}
