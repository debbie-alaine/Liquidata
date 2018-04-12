import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {DbService} from '../db/db.service';
import {CoActivity} from '../shared/models/co_activity.model';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
    animations: [routerTransition()]
})
export class CompanyHomeComponent implements OnInit {

    profile: any;
    discount_activity: CoActivity[];
    // showSpinner = true;

    constructor(private db: DbService, private auth: AuthService) {
        this.profile = {
            'email_verified': false,
            'username': 'McDonaldsChicago3427',
            'picture': 'https://vignette.wikia.nocookie.net/logopedia/images/1/1e/Plain-mcdonalds-logo.jpg/revision/latest?cb=20161208155014',
            'user_id': 'auth0|5a808c4f6937c1737553a17f',
            'nickname': 'McDonaldsChicago3427'
        }
    }

    ngOnInit() {
        // if (this.auth.userProfile) {
        //     this.profile = this.auth.userProfile;
        //     this.db.getCompanyActivityByCompanyId(this.auth.userProfile.sub).then(async activity => {
        //             this.discount_activity = activity;
        //             this.showSpinner = false;
        //         }
        //     )
        // } else {
        //     this.auth.getProfile((err, profile) => {
        //         this.profile = profile;
        //         this.db.getCompanyActivityByCompanyId(this.profile.sub).then(async activity => {
        //                 this.discount_activity = activity;
        //                 this.showSpinner = false;
        //             }
        //         )
        //     });
        // }
    }

}
