import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {Activity} from '../shared/models/activity.model';
import {AuthService} from '../auth/auth.service';
import {DbService} from '../db/db.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    profile: any;
    following_activity: Activity[];
    showSpinner = true;

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.following_activity = this.db.getFollowingActivity(this.auth.userProfile.sub);
            this.showSpinner = false;
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
                this.following_activity = this.db.getFollowingActivity(profile.sub);
                this.showSpinner = false;
            });
        }
    }
}

