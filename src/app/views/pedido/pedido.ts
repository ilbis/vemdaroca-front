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
  selector: 'app-pedido',
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css']
})
export class PedidoComponent implements AfterViewInit{
  total: number = 0;
  displayedColumns: string[] = ['nome', 'unidMedida', 'valor', 'qtd'];
  produtos:Produto[] = [];
  dataSource = new MatTableDataSource();
  pedido: Pedido;
  loading: boolean = false;

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.loading = true;
    this.produtoService.getAllActive().subscribe(data => {
      data.forEach (value => {
        value.qtd = 0;
      })
      this.produtos = data;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
      this.loading = false;
    },
    error => {
      this.loading = false;
      console.log("Erro ao carregar produtos")
      this.logout();
    })
    this.dataSource.sort = this.sort;
  }

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    private produtoService: ProdutoService, 
    private pedidoService: PedidoService,
    public dialog: MatDialog) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  menu() {
    this.router.navigate(['/menu']);
  }

  add(produto: Produto) {
    produto.qtd = parseInt(produto.qtd.toString()) +1;   
    this.updateValue(); 
  }

  remove(produto: Produto) {
    if (produto.qtd>0) {
      produto.qtd = parseInt(produto.qtd.toString()) -1;
      this.updateValue();
    }
  }

  updateValue() {
    this.total = 0;
    console.log("atualizado");
    
    this.produtos.forEach(value => {
      this.total += value.qtd * value.valor;
    })
  }

  imprimirPedido() {
    console.log(this.produtos);
    console.log("Valor Total R$" + this.total);
  }

  enviarPedido() {
    if (this.haveItems()) {
      const dialogRef = this.dialog.open(DialogData, {
        data: {
          title: 'Atenção!',
          message: 'Deseja confirmar o pedido!',
          tipo: 'okCancel'
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loading = true;
          this.pedidoService.sendItensPedido(this.genetareItensPedido()).subscribe(pedido => {
            console.log("ITEMS DE PEDIDO INCLUIDOS COM SUCESSO!");
            this.pedido = pedido;
            this.pedidoService.setPedido(pedido);
            this.pedido.total = this.total;
            this.loading = false;
            this.router.navigate(['/pedido-finalizado']);
          }, error => {
            console.log(error);
            this.dialog.open(DialogData, {
              data: {
                title: 'Poxa Vida!',
                message: 'Erro ao Enviar Pedido',
                tipo: 'default'
              }
            })
          })
        }
      });
    } else {
      const dialogRef = this.dialog.open(DialogData, {
        data: {
          title: 'Atenção!',
          message: 'Você não incluiu nenhum produto!',
          tipo: 'default'
        }
      });
    } 
  }

  genetareItensPedido():ItemPedido[] {
    let itemsPedido: ItemPedido[] = [];

    this.produtos.forEach(produto => {
        if (produto.qtd > 0) {
          let itemPedido: ItemPedido = new ItemPedido;
          itemPedido.pedido = new Pedido;
          itemPedido.produto = new Produto;

          // itemPedido.pedido.id = idPedido;
          itemPedido.produto = produto;
          itemPedido.qtd = produto.qtd;
          itemPedido.status = 'A';
          itemPedido.valor = produto.valor;
          itemsPedido.push(itemPedido);
        }
    })

    return itemsPedido;
  }

  haveItems(): boolean {
    let item:boolean = false;
    this.produtos.forEach(produto => {
      if (produto.qtd > 0) {
        item = true;
      }
    })
    return item;
  }
  
}
