import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Produto } from 'src/app/model/produto';

@Component({
    selector: 'dialog-component',
    templateUrl: 'dialog.component.html',
  })
  export class DialogData {
    public message:string;
    public tipo: string;
    public title: string;
    public email: string;
    public tiposProdutos: string[] = [];
    public unidMedida: string[] = [];
    public status: string[] = [];
    public produto: Produto = new Produto;
    
    constructor(
      public dialogRef: MatDialogRef<DialogData>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.message = data.message;
        this.tipo = data.tipo;
        this.title = data.title;
        this.tiposProdutos = data.tiposProdutos;
        this.unidMedida = data.unidMedida;
        this.status = data.status;
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }

    enviarProduto() {
      this.dialogRef.close(this.produto);
    }

    enviarEmail() {
      this.dialogRef.close(this.email);
    }
  }
  