import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
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
        private userService: UserService,
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
          this.loading = false;
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
          this.dialog.open(DialogData, {
            data: {
              title: 'Atenção',
              message: 'Usuario ou senha incorreto!',
              tipo: 'default'
            }
          });
        });
  }

  esqueceuSenha() {
    const dialogRef = this.dialog.open(DialogData, {
      data: {
        title: 'Recuperação de Senha',
        message: 'Digite o seu email que enviaremos uma nova senha!',
        tipo: 'recuperacaoSenha'
      }
    });
    dialogRef.afterClosed().subscribe(email => {
      if(email != undefined) {
        this.loading = true;
        console.log(email)
        this.userService.sendEmail(email).subscribe(produto => {

          this.loading = false;
          this.dialog.open(DialogData, {
            data: {
              title: 'Legal!',
              message: 'Email Enviado com Sucesso!',
              tipo: 'default'
            }
          });
        },error => {
          console.log(error);
          this.loading = false;
          this.dialog.open(DialogData, {
            data: {
              title: 'Poxa Vida!',
              message: 'Erro ao Enviar Email de Recuperação',
              tipo: 'default'
            }
          });
        })
      }})
  }

  convertBase64(password:string): string {
      return btoa(encodeURIComponent(password).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode(("0x" + p1) as any);
      }))
  }; 

}