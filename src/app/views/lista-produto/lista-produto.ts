import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../utils/dialog.component';

@Component({
  selector: 'app-lista-produto',
  templateUrl: './lista-produto.html',
  styleUrls: ['./lista-produto.css']
})
export class ListaProdutoComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'nome', 'tipo', 'unidMedida', 'valor', 'status'];
  produtos:Produto[] = [];
  dataSource = new MatTableDataSource();
  loading: boolean = false;

  tipos: string[] = [
    'TUBERCULO',
    'FRUTA',
    'VERDURA',
    'LEGUMES',
    'FOLHA'
  ];

  unidMedida: string[] = [
  	'KILO',
	  'UNIDADE',
	  'LITRO',
	  'MAÇO'
  ];

  status: string[] = [
  	'A',
	  'I'
  ];
  
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.loading = true;
    this.produtoService.getAll().subscribe(data => {
      this.produtos = data;
      this.dataSource = new MatTableDataSource(data);
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
    public dialog: MatDialog) { }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  menu() {
    this.router.navigate(['/menu']);
  }

  novoProduto() {
    const dialogRef = this.dialog.open(DialogData, {
      data: {
        title: 'Novo Produto',
        tipo: 'novoProduto',
        tiposProdutos: this.tipos,
        unidMedida: this.unidMedida,
        status: this.status
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined) {
        this.loading = true;
        this.produtoService.sendProduto(result).subscribe(produto => {
          this.produtos.push(produto);
          this.dataSource = new MatTableDataSource(this.produtos);
          this.loading = false;

          this.dialog.open(DialogData, {
            data: {
              title: 'Legal!',
              message: 'Produto Adicionado com Sucesso!',
              tipo: 'default'
            }
          });
        },error => {
          console.log(error);
          this.loading = false;
          this.dialog.open(DialogData, {
            data: {
              title: 'Poxa Vida!',
              message: 'Erro ao Adicionar Produto',
              tipo: 'default'
            }
          });
        })
      }
    });
  }
  
  atualizarProdutos() {
    const dialogRef = this.dialog.open(DialogData, {
      data: {
        title: 'Atenção!',
        message: 'Deseja confirmar a atualização?',
        tipo: 'okCancel'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.produtoService.updateAll(this.produtos).subscribe(produtos => {
          console.log("PRODUTOS ATUALIZADOS COM SUCESSO!");
          this.produtos = produtos;
          this.loading = false;
          this.dialog.open(DialogData, {
            data: {
              title: 'Legal!',
              message: 'Produtos Atualizados com Sucesso!',
              tipo: 'default'
            }
          });
        }, error => {
          console.log(error);
          this.dialog.open(DialogData, {
            data: {
              title: 'Poxa Vida!',
              message: 'Erro ao Atualizar Produtos',
              tipo: 'default'
            }
          });
        })
      }
    });
  }
}
