import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './views/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CadastroUsuarioComponent } from './views/cadastro-usuario/cadastro-usuario';
import { MatButtonModule } from '@angular/material/button';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './views/pedido/pedido';
import { DialogData } from './views/utils/dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import { MenuComponent } from './views/menu/menu';
import { ListaProdutoComponent } from './views/lista-produto/lista-produto';
import { MatSelectModule } from '@angular/material/select';
import { EditarUsuarioComponent } from './views/editar-usuario/editar-usuario';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  schemas:[
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    PedidoComponent,
    MenuComponent,
    ListaProdutoComponent,
    EditarUsuarioComponent,
    DialogData
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
    ],
    entryComponents: [
      DialogData
    ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
