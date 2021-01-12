import { Component, DEFAULT_CURRENCY_CODE, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from 'src/app/services/pedido.service';
import { Pedido } from 'src/app/model/pedido';


@Component({
  selector: 'app-pedido-finalizado',
  templateUrl: './pedido-finalizado.html',
  styleUrls: ['./pedido-finalizado.css']
})
export class PedidoFinalizadoComponent implements OnInit{
  public pedido:Pedido;
  b: number = 1.3495;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    public dialog: MatDialog,
    private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedido = this.pedidoService.getPedido();
    if (this.pedido === undefined) {
      this.novoPedido();
    }

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  novoPedido() {
    this.router.navigate(['/pedido']);
  }
 
}
