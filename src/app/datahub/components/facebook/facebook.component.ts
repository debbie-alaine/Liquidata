import { Component, OnInit, Input } from '@angular/core';
import {FacebookService, LoginResponse} from 'ngx-facebook';

@Component({
    selector: 'app-facebook',
    templateUrl: './facebook.component.html',
    styleUrls: ['./facebook.component.scss']
})
export class FacebookComponent implements OnInit {

    constructor(private fb: FacebookService) { }

    ngOnInit() {
    }

    fbLogin() {
        this.fb.login()
            .then((response: LoginResponse) => console.log('Logged in', response))
            .catch(e => console.error('Error logging in'));
    }

}
