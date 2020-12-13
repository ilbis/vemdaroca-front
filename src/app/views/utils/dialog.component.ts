import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'dialog-component',
    templateUrl: 'dialog.component.html',
  })
  export class DialogData {
    public message:string = '';
    public okCancel: boolean = false;
    
    constructor(
      public dialogRef: MatDialogRef<DialogData>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.message = data.message;
      this.okCancel = data.okCancel;
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
  }
  