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
    company_following = [];
    user_following = [];

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.db.getUserActivityByUserId(this.auth.userProfile.sub).then(async activity => {
                this.discount_activity = activity;
                this.showSpinner = false;
                await this.db.getFollowingCompanies(this.auth.userProfile.sub, callback => this.updateCompanyFollowing(callback));
                await this.db.getFollowingUsers(this.auth.userProfile.sub, callback => this.updateUserFollowing(callback));

                }
            )
        } else {
            this.auth.getProfile((err, profile) => {
                this.profile = profile;
                this.db.getUserActivityByUserId(this.profile.sub).then(async activity => {
                        this.discount_activity = activity;
                        this.showSpinner = false;
                        await this.db.getFollowingCompanies(this.profile.sub, callback => this.updateCompanyFollowing(callback));
                        await this.db.getFollowingUsers(this.profile.sub, callback => this.updateUserFollowing(callback));
                    }
                )
            });
        }
    }

    updateCompanyFollowing(companies: string[]) {
        this.company_following = companies;
    }

    updateUserFollowing(users: string[]) {
        this.user_following = users;
        console.log(this.user_following);
    }
}
