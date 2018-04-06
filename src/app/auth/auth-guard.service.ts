import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(public auth: AuthService, public router: Router, private location: Location) {}

    canActivate(): boolean {

        if (!this.auth.isAuthenticated()) {
            localStorage.removeItem('access_token');
            this.router.navigate(['/splash']);
            return false;
        }
        return true;
    }

}
