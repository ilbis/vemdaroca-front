import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroUsuario: FormGroup;
  submitted = false;
  myForm: User;

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
    private userService: UserService
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
    
    this.userService.createUser(this.myForm).subscribe((response:any) => {
      alert('SUCCESS!! :-)\n\n' + JSON.stringify(response))
    },err => {
      console.log(err)
    })

  }


  back() {
    this.router.navigateByUrl('/login')
  }
}
