import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserActivity} from '../shared/models/user_activity.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
    animations: [routerTransition()]
})
export class UserDetailComponent implements OnInit, OnDestroy {

    private routeSub: any;
    private userName: string;
    private userURL: string;
    private userId: string;
    private userActivity: UserActivity[];
    showSpinner = true;
    following = [];
    profile: any;

    constructor(private route: ActivatedRoute, private db: DbService, private router: Router,
                private auth: AuthService) {
    }

     ngOnInit() {
        if (!this.checkCompanyNameExists(this.userName)) {
            this.router.navigate(['/not-found']);
        }

        this.routeSub = this.route.params.subscribe(async params => {
            this.userName = params['id'];
            await this.db.getUserId(this.userName, callback => this.onReceiveId(callback));
            if (this.auth.userProfile) {
                this.profile = this.auth.userProfile;
                await this.db.getFollowingUsers(this.auth.userProfile.sub, callback => this.updateIsFollowed(callback));
            } else {
                this.auth.getProfile(async (err, profile) => {
                    this.profile = profile;
                    await this.db.getFollowingUsers(this.profile.sub, callback => this.updateIsFollowed(callback));
                });
            }
        });
    }

    updateIsFollowed(users: string[]) {
        this.following = users;
    }

    onReceiveId(id: string) {
        this.userId = id;
        this.db.getUserActivityByUserId(id).then(activity => {
            this.userActivity = activity;
        });
        this.db.getUserProfilePicture(id).then(url => {
            this.userURL = url[0];
        });
        this.showSpinner = false;
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    // TODO: check that company exists before loading
    public checkCompanyNameExists(companyName) {
        return true;
    }

    followClick(idElement) {
        const element = document.getElementById(idElement);
        if (element.innerText === 'Follow') {
            element.innerHTML = 'Followed <i class="fa fa-check"></i>';
            this.db.followUser(this.profile.sub, this.userId);
        } else {
            element.innerHTML = 'Follow';
            this.db.unfollowUser(this.profile.sub, this.userId);
        }
    }
}
