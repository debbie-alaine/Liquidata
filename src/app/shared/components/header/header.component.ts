import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    showHeader() {
        if (this.router.url === '/login' || this.router.url === '/signup') {
            return false;
        }

        return true;
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }
}
