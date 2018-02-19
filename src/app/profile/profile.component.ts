import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {AuthService} from '../auth/auth.service';
import {Activity} from '../shared/models/activity.model';
import {DbService} from '../db/db.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {

    profile: any;
    discount_activity: Activity[];
    showSpinner = true;

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.discount_activity = this.db.getActiveDiscountsFromUser(this.auth.userProfile.sub);
            this.showSpinner = false;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
                this.discount_activity = this.db.getActiveDiscountsFromUser(profile.sub);
                this.showSpinner = false;
            });
        }
    }
}
