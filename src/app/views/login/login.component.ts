import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogData } from '../utils/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted = false;
  returnUrl: string;
  error = '';
  hide = true;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        public dialog: MatDialog) {
                 // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
          this.router.navigate(['/menu']);
      }
        }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

    // // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.convertBase64(this.f.password.value))
        .pipe(first())
        .subscribe(
          data => {
              this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
                this.openDialog();
                console.log("Usuario ou senha incorretos")
            });
  }

  convertBase64(password:string): string {
      return btoa(encodeURIComponent(password).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode(("0x" + p1) as any);
      }))
  }; 

  openDialog() {
    this.dialog.open(DialogData, {
      data: {
        title: 'Atenção!',
        message: 'Usuario ou senha incorreto!',
        tipo: 'default'
      }
    });
  }

}