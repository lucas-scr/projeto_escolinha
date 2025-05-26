import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
    readonly API = 'http://localhost:8080/api/auth/google'
    // private _token = new BehaviorSubject<string | null>(null);
    //  token$ = this._token.asObservable();


    constructor(private http: HttpClient) {
        const token = localStorage.getItem('app_token');
        console.log("constructor service")
        if (token) {
            console.log("constructor service")
            //this._token.next(token);
        }
    }

    
    loginWithGoogle(tokenGoogle: string): Observable<{token: string}> {
        const headers = {
            'Content-Type': 'application/json'
        };

        let body = { token: tokenGoogle }
        console.log('URL chamada:', this.API);
        console.log('Header enviado:', headers);
        console.log('Body enviado:', body);
        return this.http.post<{token: string}>('http://localhost:8080/api/auth/google', body, { headers })
    }

    get token() {
        return this.token.value || localStorage.getItem('app_token')
    }

    // logout() {
    // this._token.next(null);
    //   localStorage.removeItem('app_token')
    //  }

    isLoggedIn(): boolean {
        return !!this.token
    }
}