import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from 'src/app/model/produto';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido';
import { ItemPedido } from '../model/item-pedido';

@Injectable({ providedIn: 'root' })
export class PedidoService {
    public apiURL = environment.apiUrl;
    constructor(private http: HttpClient, private authentication: AuthenticationService) { }

    getAll (): Observable<Produto[]>{
        return this.http.get<Produto[]>(`${this.apiURL}/produto/allActive`);
    }

    sendPedido (): Observable<Pedido> {
        return this.http.post<Pedido>(`${this.apiURL}/pedido`, {});
    }

    sendItensPedido (itemPedido: ItemPedido[]): Observable<ItemPedido[]> {
        return this.http.post<ItemPedido[]>(`${this.apiURL}/itempedido/createAll`, itemPedido);
    }
}