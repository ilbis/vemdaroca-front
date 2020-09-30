import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vemdaroca-front';
  currentUser: User;

  constructor(private authenticationService: AuthenticationService, private router:Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
