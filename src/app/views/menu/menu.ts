import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../utils/dialog.component';
import { PedidoService } from 'src/app/services/pedido.service';
import { ItemPedido } from 'src/app/model/item-pedido';
import { Pedido } from 'src/app/model/pedido';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit{
  userAdmin: boolean = false;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userAdmin = this.authenticationService.getRole() ? true : false;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  novoPedido() {
    this.router.navigate(['/pedido']);
  }
}