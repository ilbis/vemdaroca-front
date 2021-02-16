import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from 'src/app/model/produto';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProdutoService {
    public apiURL = environment.apiUrl;
    constructor(private http: HttpClient, private authentication: AuthenticationService) { }

    getAllActive(): Observable<Produto[]>{
        return this.http.get<Produto[]>(`${this.apiURL}/produto/allActive`);
    }

    getAll(): Observable<Produto[]>{
        return this.http.get<Produto[]>(`${this.apiURL}/produto/all`);
    }

    updateAll(produtos:Produto[]): Observable<Produto[]>{
        return this.http.put<Produto[]>(`${this.apiURL}/produto/all`,produtos);
    }

    sendProduto(produto:Produto): Observable<Produto>{
        return this.http.post<Produto>(`${this.apiURL}/produto`,produto);
    }

    deleteProduto(id:number): Observable<Produto> {
        return this.http.delete<Produto>(`${this.apiURL}/produto/${id}`);
    }
}