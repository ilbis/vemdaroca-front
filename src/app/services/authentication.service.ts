import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import jwt_decode from "jwt-decode";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    public apiURL = environment.apiUrl;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private userWithToken: User;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {

        const usr = {
            username:username,
            password:password,
        }

        return this.http.post<any>(`${environment.apiUrl}/login`, usr,{observe:'response' as 'body'})
            .pipe(map(response => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                this.userWithToken = response;
                localStorage.setItem('currentUser', JSON.stringify(response));
                localStorage.setItem('token', response.headers.get('Authorization'));

                this.currentUserSubject.next(response);
                return "user";
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getToken():any{
        return localStorage.getItem('token');
    }

    getRole(): string {
        return jwt_decode(localStorage.getItem('token'))['auth'];
    }

}