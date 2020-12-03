import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

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

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.produtoService.getAll().subscribe(data => {
      data.forEach (value => {
        value.qtd = 0;
      })
      this.produtos = data;
      this.dataSource = new MatTableDataSource(data);
      console.log(data);
    },
    error => {
      console.log("Erro ao carregar produtos")
    })
    this.dataSource.sort = this.sort;
  }

  constructor(private authenticationService: AuthenticationService, private router: Router, private produtoService: ProdutoService) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  add(produto: Produto) {
    produto.qtd +=1;   
    this.updateValue(); 
  }

  remove(produto: Produto) {
    if (produto.qtd>0) {
      produto.qtd -=1;
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
}
