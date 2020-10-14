import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.html',
  styleUrls: ['./cadastro-usuario.css']
})
export class CadastroUsuarioComponent implements OnInit {
  cadastroUsuario: FormGroup;
  submitted = false;

  constructor(private authenticationService: AuthenticationService, private router: Router, private formBuilder: FormBuilder,
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
          senha: ['', Validators.required],
          confirmarSenha: ['', Validators.required]
      });
    }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.cadastroUsuario.invalid) {
        return;
    }
  }

  back() {
    this.router.navigateByUrl('/login')
  }
}
