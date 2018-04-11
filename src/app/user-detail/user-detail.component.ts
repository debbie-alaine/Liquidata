import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserActivity} from '../shared/models/user_activity.model';
import {AuthService} from '../auth/auth.service';
import {DialogTimelineComponent} from '../shared/components/dialog-timeline/dialog-timeline.component';
import {MatDialog} from '@angular/material/dialog';

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
    company_following = [];
    user_following = [];
    following = []; // is current user following?
    profile: any;
    discounts = [];

    constructor(private route: ActivatedRoute, private db: DbService, private router: Router,
                private auth: AuthService,  public dialog: MatDialog) {
    }

     ngOnInit() {
        if (!this.checkCompanyNameExists(this.userName)) {
            this.router.navigate(['/not-found']);
        }

        this.routeSub = this.route.params.subscribe(async params => {
            this.userName = params['id'];
            await this.db.getUserId(this.userName, callback => this.onReceiveId(callback));
        });
    }

    updateIsFollowed(following: string[]) {
        this.following = following;
    }

    updateCompanyFollowed(company: string[]) {
        this.company_following = company;
    }

    updateUserFollowed(users: string[]) {
        this.user_following = users;
    }

    onReceiveId(id: string) {
        this.userId = id;
        this.db.getUserActivityByUserId(id).then(activity => {
            this.userActivity = activity;
        });
        this.db.getUserProfilePicture(id).then(url => {
            this.userURL = url[0];
        });
        if (this.auth.userProfile) {
            this.profile = this.auth.userProfile;
            this.db.getFollowingUsers(this.auth.userProfile.sub, callback => this.updateIsFollowed(callback));
            this.db.getFollowingCompanies(this.userId, callback => this.updateCompanyFollowed(callback));
            this.db.getFollowingUsers(this.userId, callback => this.updateUserFollowed(callback));
            this.discounts = this.db.getDiscountsFromUser(this.profile.sub);
        } else {
            this.auth.getProfile(async (err, profile) => {
                this.profile = profile;
                this.db.getFollowingUsers(this.profile.sub, callback => this.updateIsFollowed(callback));
                this.db.getFollowingCompanies(this.userId, callback => this.updateCompanyFollowed(callback));
                this.db.getFollowingUsers(this.userId, callback => this.updateUserFollowed(callback));
                this.discounts = this.db.getDiscountsFromUser(this.profile.sub);
            });
        }
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

    isLiked(activity, idElement) {
        const element = document.getElementById(idElement);

        if (element.innerText === 'Like ') {
            this.dialog.open(DialogTimelineComponent, {
                data: {
                    user_id: this.profile.sub,
                    discount_id: activity.discount_id,
                    coupon_desc: activity.coupon_desc,
                    data_desc: activity.data_desc,
                    discount_company: activity.discount_company,
                    data_platform: activity.data_platform,
                    isLiked: true
                }
            });

        } else {
            this.dialog.open(DialogTimelineComponent, {
                data: {
                    user_id: this.profile.sub,
                    discount_id: activity.discount_id,
                    coupon_desc: activity.coupon_desc,
                    data_desc: activity.data_desc,
                    discount_company: activity.discount_company,
                    data_platform: activity.data_platform,
                    isLiked: false
                }
            });
        }
    }
}
