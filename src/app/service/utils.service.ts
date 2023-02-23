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

}
