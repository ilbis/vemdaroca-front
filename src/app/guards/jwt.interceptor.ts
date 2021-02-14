import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.authenticationService.currentUserValue;
        let token = this.authenticationService.getToken();
        if (currentUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `${token}`
                }
            });
        }
        return next.handle(request);
    }
}