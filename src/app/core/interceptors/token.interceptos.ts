import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor 
{
    constructor(private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const excludedUrls = [
            '/api/auth/google',
            '/auth/login',
        ];
        if (excludedUrls.some(url => req.url.includes(url))) {
            return next.handle(req);
        }
        const token = this.auth.token;
        if (token) {
            console.log("interceptor adicionando Authorization");
            const clone = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(clone);
        }
        return next.handle(req);
    }
}