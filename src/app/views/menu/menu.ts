import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';

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