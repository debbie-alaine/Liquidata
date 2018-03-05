import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {AuthService} from '../auth/auth.service';
import {UserActivity} from '../shared/models/user_activity.model';
import {DbService} from '../db/db.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
    animations: [routerTransition()]
})
export class ProfileComponent implements OnInit {

    profile: any;
    discount_activity: UserActivity[];
    showSpinner = true;

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.discount_activity = this.db.getProfileActivityFromUser(this.auth.userProfile.sub);
            this.showSpinner = false;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
                this.discount_activity = this.db.getProfileActivityFromUser(profile.sub);
                this.showSpinner = false;
            });
        }
    }
}