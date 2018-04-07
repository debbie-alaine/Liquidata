import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {AuthService} from '../auth/auth.service';
import {DbService} from '../db/db.service';
import {CoActivity} from '../shared/models/co_activity.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {

    profile: any;
    following_activity: CoActivity[];
    showSpinner = true;

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.following_activity = this.db.getFollowingActivityFromUser(this.auth.userProfile.sub);
            this.removeSpinner();
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
                this.following_activity = this.db.getFollowingActivityFromUser(this.profile.sub);
                this.removeSpinner();
            });
        }
    }

    removeSpinner() {
        if (this.following_activity.length === 0) {
            setTimeout(cb => { this.showSpinner = false}, 350)
        } else {
            this.showSpinner = false;
        }
    }
}

