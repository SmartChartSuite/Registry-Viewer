import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  showErrorMessage(messageStr: string = 'Server Error.'){
    this._snackBar.open(messageStr, 'x' ,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-color'],
      duration: 5000
    });
  }

  showSuccessMessage(messageStr: string){
    this._snackBar.open(messageStr, 'x' ,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', 'mat-primary'],
      duration: 5000
    });
  }

  convertDate(date){
    if(!date || !(date instanceof Date)){
      console.warn("Invalid function argument found: " + date);
      return null;
    }
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth()+1).toString(); //JS uses 0-based month
    const dd  = date.getDate().toString();

    const mmChars = mm.split('');
    const ddChars = dd.split('');
    const result = yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
    return result;
  }
}
