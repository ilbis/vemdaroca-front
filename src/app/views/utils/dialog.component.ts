import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'dialog-component',
    templateUrl: 'dialog.component.html',
  })
  export class DialogData {
    public message:string = '';
    constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.message = data.message;
    }
  }
  