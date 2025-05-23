import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private _token = new BehaviorSubject<string | null>(null);
    token$ = this._token.asObservable();

    constructor(private http: HttpClient){}

    loginWithGoogle(tokenGoogle: string){
        return this.http.post<{token : string}>('http://localhost:3000/api/auth/google', {token: tokenGoogle})
        .pipe(
            tap(response => {
                this._token.next(response.token);
                localStorage.setItem('app_token', response.token);
            })
        )
    }

    get token(){
        return this._token.value || localStorage.getItem('app_token')
    }

    logout(){
        this._token.next(null);
        localStorage.removeItem('app_token')
    }

    isLoggedIn(): boolean{
        return !!this.token
    }
}