import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-company-header',
    templateUrl: './company-header.component.html',
    styleUrls: ['./company-header.component.scss'],
    providers: [AuthService]
})
export class CompanyHeaderComponent implements OnInit {

    constructor(public router: Router, private auth: AuthService) {

    }

    ngOnInit() {
    }

    public logout() {
        this.auth.logout();
    }

}
