import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { error } from 'pdf-lib';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor 
{
    constructor(private auth: AuthService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const excludedUrls = [
            '/api/auth/google',
            '/auth/login',
        ];
        if (excludedUrls.some(url => req.url.includes(url))) {
            return next.handle(req);
        }
        const token = this.auth.token;
        let clone = req;
        if (token) {
            console.log("interceptor adicionando Authorization");
            clone = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(clone).pipe(
            catchError((error: HttpErrorResponse) => {
                if(error.status === 401 || error.status === 403){
                     console.log("Token inválido ou expirado, redirecionando para login.");
                     this.auth.logout();
                    this.router.navigate(['auth/login']);

                }
                return throwError(() => error)
            })
        );
    }
}