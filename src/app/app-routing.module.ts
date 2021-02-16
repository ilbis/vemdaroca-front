import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BasicAuthInterceptor } from './guards/basic.auth.interceptor';
import { ErrorInterceptor } from './guards/error.interceptor';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario';
import { EditarUsuarioComponent } from './views/editar-usuario/editar-usuario';
import { ListaProdutoComponent } from './views/lista-produto/lista-produto';
import { LoginComponent } from './views/login/login.component';
import { MenuComponent } from './views/menu/menu';
import { PedidoFinalizadoComponent } from './views/pedido-finalizado/pedido-finalizado';
import { PedidoComponent } from './views/pedido/pedido';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'cadastro-usuario',
    component: CadastroUsuarioComponent
  },
  { 
    path: 'menu',
    component: MenuComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'produto',
    component: ListaProdutoComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'pedido',
    component: PedidoComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'editar-usuario',
    component: EditarUsuarioComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'pedido-finalizado',
    component: PedidoFinalizadoComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppRoutingModule { }
