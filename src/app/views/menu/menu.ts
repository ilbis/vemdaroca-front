import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from 'src/app/services/pedido.service';
import { DialogData } from '../utils/dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit{
  userAdmin: boolean = false;
  loading:boolean = false;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    private pedidoService: PedidoService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userAdmin = this.authenticationService.getRole() == 'ROLE_ADMIN' ? true : false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  novoPedido() {
    this.router.navigate(['/pedido']);
  }

  editarProdutos() {
    this.router.navigate(['/produto']);
  }

  editarUsuario() {
    this.router.navigate(['/editar-usuario']);
  }

  gerarRelatorio() {
    const dialogRef = this.dialog.open(DialogData, {
      data: {
        title: 'Gerar Relatório',
        tipo: 'relatorio'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.start != null && result.end != null) {
        console.log("Entrou no metodo")
        this.loading = true;
        this.pedidoService.getRelatorio(result).subscribe(value => {

          var newBlob = new Blob([value], { type: "application/xlxs" });
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(newBlob);
              return;
          }
      
          const data = window.URL.createObjectURL(newBlob);
      
          var link = document.createElement('a');
          link.href = data;
          link.download = "Relatorio.xlsx";
          link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      
          setTimeout(function () {
            window.URL.revokeObjectURL(data);
            link.remove();
          }, 100);
          this.loading = false;
        },error => {
          console.log(error);
          this.loading = false;
          this.dialog.open(DialogData, {
            data: {
              title: 'Poxa Vida!',
              message: 'Erro ao Gerar Relatorio',
              tipo: 'default'
            }
          });
        });
      }})};

}