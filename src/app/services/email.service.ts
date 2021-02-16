import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Produto } from 'src/app/model/produto';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmailService {
    public apiURL = environment.apiUrl;
    constructor(private http: HttpClient, private authentication: AuthenticationService) { }

    sendEmail(email:string): Observable<string>{
        return this.http.post<string>(`${this.apiURL}/email`,email);
    }
}