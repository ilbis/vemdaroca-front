import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BasicAuthInterceptor } from './guards/basic.auth.interceptor';
import { ErrorInterceptor } from './guards/error.interceptor';
import { LoginComponent } from './views/login/login.component';
import { PedidoComponent } from './views/pedido/pedido';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AuthGuard]},
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'pedido',
    component: PedidoComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class AppRoutingModule { }
