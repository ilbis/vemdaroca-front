import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { DialogData } from '../utils/dialog.component';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuarioComponent implements OnInit {
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
          email: ['', Validators.required],
          tel: ['', Validators.required],
          cep: ['', Validators.required],
          rua: ['', Validators.required],
          numero: ['', Validators.required],
          complemento: ['', Validators.required],
          bairro: ['', Validators.required],
          cidade: ['', Validators.required],
          uf: ['', Validators.required],
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required]
      });
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
    this.userService.createUser(this.myForm).subscribe((response:any) => {
<<<<<<< HEAD
      this.openDialog("Oba! Usuario Criado Com Sucesso!")
=======
      this.openDialog("Usuario criado com sucesso, você receberá um email de ativação");
>>>>>>> 3ee46c3f98fa623283f782a3af2f5be0a1676dc6
      this.cadastroUsuario.reset();
      this.loading = false;
    },err => {
<<<<<<< HEAD
        this.openDialog("Erro ao criar usuario! Por gentileza tente mais tarde!")
      })
=======
      this.loading = false;
      this.openDialog("Erro ao criar usuario")
    })
>>>>>>> 3ee46c3f98fa623283f782a3af2f5be0a1676dc6
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
