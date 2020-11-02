import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UserService {
    public apiURL = environment.apiUrl;
    constructor(private http: HttpClient) { }

    // getAll() {
    //     return this.http.get<User[]>(`${config.apiUrl}/users`);
    // }

    createUser (user: User) {
        return this.http.post<User>(`${this.apiURL}/cliente`,user,{ headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }});
    }
}