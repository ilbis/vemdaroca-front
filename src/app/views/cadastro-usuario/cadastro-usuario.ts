import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/utils/confirmed-validator';
import { DialogData } from '../utils/dialog.component';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuarioComponent implements OnInit {
  telMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  cadastroUsuario: FormGroup;
  submitted = false;
  myForm: User;
  loading: boolean = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
    private userService: UserService, public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.cadastroUsuario = this.formBuilder.group({
      nome: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.email],
      tel: ['', Validators.required],
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['']
    }, { validator: ConfirmedValidator('password', 'confirmPassword') });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.cadastroUsuario.invalid) {
      return;
    }

    this.myForm = this.cadastroUsuario.value;
    this.myForm.password = btoa(encodeURIComponent(this.myForm.password).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode(("0x" + p1) as any);
      }));

    this.loading = true;
    this.userService.createUser(this.myForm).subscribe((response: any) => {
      this.openDialog("Oba! Usuario Criado Com Sucesso!")
      // this.cadastroUsuario.reset();
      this.loading = false;
      this.back();
    }, err => {
      this.loading = false;
      this.openDialog("Erro ao criar usuario! Por gentileza tente mais tarde!")
    })
  }

  back() {
    this.router.navigateByUrl('/login')
  }

  openDialog(text: string) {
    this.dialog.open(DialogData, {
      data: {
        message: text,
        tipo: 'default',
        title: 'Atenção!'
      }
    });
  }
}