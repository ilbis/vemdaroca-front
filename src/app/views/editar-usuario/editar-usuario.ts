import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ConfirmedValidator } from 'src/app/utils/confirmed-validator';
import { DialogData } from '../utils/dialog.component';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css']
})
export class EditarUsuarioComponent implements OnInit {
  telMask = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cepMask = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];

  editarUsuario: FormGroup = new FormGroup({
    nome: new FormControl(),
    username: new FormControl(),
    email: new FormControl(),
    tel: new FormControl(),
    cep: new FormControl(),
    rua: new FormControl(),
    numero: new FormControl(),
    complemento: new FormControl(),
    bairro: new FormControl(),
    cidade: new FormControl(),
    uf: new FormControl(),
    password: new FormControl(),
    confirmPassword: new FormControl()
  });
  submitted = false;
  myForm: User;
  loading: boolean = false;

  user: User = new User();

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
    private userService: UserService, public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.userService.getUser().subscribe(user => {
      this.user = user;
      console.log(user);

      this.editarUsuario = this.formBuilder.group({
        nome: [this.user.nome, Validators.required],
        username: [this.user.username, Validators.required],
        email: [this.user.email, Validators.email],
        tel: [this.user.tel, Validators.required],
        cep: [this.user.cep, Validators.required],
        rua: [this.user.rua, Validators.required],
        numero: [this.user.numero, Validators.required],
        complemento: [this.user.complemento, Validators.required],
        bairro: [this.user.bairro, Validators.required],
        cidade: [this.user.cidade, Validators.required],
        uf: [this.user.uf, Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['']
      }, { validator: ConfirmedValidator('password', 'confirmPassword') });
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.editarUsuario.invalid) {
      return;
    }

    this.myForm = this.editarUsuario.value;
    this.myForm.password = btoa(encodeURIComponent(this.myForm.password).replace(/%([0-9A-F]{2})/g,
      (match, p1) => {
        return String.fromCharCode(("0x" + p1) as any);
      }));

    this.loading = true;
    this.userService.updateUser(this.myForm).subscribe((response: any) => {
      this.openDialog("Usuario atualizado com sucesso!");
      this.menu();
      // this.editarUsuario.reset();
      this.loading = false;
    }, err => {
      this.loading = false;
      this.openDialog("Erro ao atualizar usuario!");
    })
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

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  menu() {
    this.router.navigate(['/menu']);
  }
}
