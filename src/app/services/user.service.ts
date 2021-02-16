import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    public apiURL = environment.apiUrl;
    constructor(private http: HttpClient) { }

    createUser (user: User) {
        return this.http.post<User>(`${this.apiURL}/cliente`,user,{ headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
    }

    sendEmail(email:string): Observable<string>{
        return this.http.post<string>(`${this.apiURL}/cliente/recuperaCadastro`,email);
    }
}