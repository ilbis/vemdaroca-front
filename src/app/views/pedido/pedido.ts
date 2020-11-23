import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProdutoService } from 'src/app/services/produto.service';
import { Produto } from 'src/app/model/produto';
import { MatTableDataSource } from '@angular/material/table';
import { SelectQuantityComponent } from 'src/app/utils/select-quantity/select-quantity.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.html',
  styleUrls: ['./pedido.css']
})
export class PedidoComponent implements OnInit {

  frameworkComponents: any;

  rowDataClicked1 = {};

  public colunas = [
      { field: 'nome', headerName: 'Produto', sortable: true, resizable: true, width:'110px',cellStyle:{'font-size':'10px'}},
      { field: 'unidMedida', headerName: 'Unid Medida', sortable: true, resizable: true ,width:'80px', cellStyle:{'font-size':'10px'}},
      { field: 'valor', resizable: true, width:'70px', cellStyle:{'font-size':'10px'}},
      {
        field: 'Quantidade',
        headerName: 'Qtd',
        width:'130px',
        cellRenderer: 'buttonRenderer',
        cellRendererParams: {
          onClick: this.onBtnClick1.bind(this),
          label: 'Selecionar'
        }
      },
  ];

  public produtos:Produto[] = [];

  public data: MatTableDataSource<Produto>;

  constructor(private authenticationService: AuthenticationService, private router: Router, private produtoService: ProdutoService) { 
    this.frameworkComponents = {
      buttonRenderer: SelectQuantityComponent,
    }
  }

  ngOnInit(): void {
    this.produtoService.getAll().subscribe(data => {
      this.produtos = data;
      console.log(data);
    },
    error => {
      console.log("Erro ao carregar produtos")
    })
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  onBtnClick1(e) {
    this.rowDataClicked1 = e.rowData;
  }
}
