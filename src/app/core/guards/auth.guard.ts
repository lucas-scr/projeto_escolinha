import { Injectable } from '@angular/core';
import {CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {

    }

    canActivate(): boolean {
        if (this.auth.isLoggedIn()) {
                        console.log("interceptor")
            console.log("guard")

            return true;
        }
        this.router.navigate(['auth/login']);
         console.log("guard")
        return false;
    }

}