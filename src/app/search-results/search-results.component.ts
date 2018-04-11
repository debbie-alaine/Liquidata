import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
    animations: [routerTransition()]
})
export class SearchResultsComponent implements OnInit, OnDestroy {

    profile: any;
    companies = [];
    users = [];
    showSpinner = true;
    private routeSub: any;
    private searchValue: string;
    company_following = [];
    user_following = [];

    constructor(private route: ActivatedRoute, private db: DbService, private auth: AuthService) {
        this.routeSub = this.route.queryParams.subscribe(async params => {
            this.searchValue = params['value'];

            if (this.auth.userProfile) {
                this.profile = this.auth.userProfile;
                await this.db.getFollowingCompanies(this.auth.userProfile.sub, callback => this.updateCompanyFollowing(callback));
                await this.db.getFollowingUsers(this.auth.userProfile.sub, callback => this.updateUserFollowing(callback));
                this.search();
            } else {
                this.auth.getProfile(async (err, profile) => {
                    this.profile = profile;
                    await this.db.getFollowingCompanies(this.profile.sub, callback => this.updateCompanyFollowing(callback));
                    await this.db.getFollowingUsers(this.auth.userProfile.sub, callback => this.updateUserFollowing(callback));
                    this.search();
                });
            }
        });
    }

    ngOnInit() {
        this.showSpinner = false;
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    updateCompanyFollowing(following: string[]) {
        this.company_following = following;
    }

    updateUserFollowing(following: string[]) {
        this.user_following = following;
    }

    search() {
        this.db.searchByCompany(this.searchValue).then(
            (results) => {
                this.companies = results;
            }
        );

        this.db.searchByUser(this.searchValue).then(
            (results) => {
                this.users = results;
            }
        );
    }

    followClickCompany(idElement, companyName) {
       this.db.getCompanyId(companyName, callback => {
            const element = document.getElementById(idElement);
            if (element.innerText === 'Follow') {
                element.innerHTML = 'Followed <i class="fa fa-check"></i>';
                this.db.followCompany(callback, this.profile.sub);
            } else {
                element.innerHTML = 'Follow';
                this.db.unfollowCompany(callback, this.profile.sub);
            }
        });
    }

    followClickUser(idElement, userName) {
        this.db.getUserId(userName, callback => {
            const element = document.getElementById(idElement);
            if (element.innerText === 'Follow') {
                element.innerHTML = 'Followed <i class="fa fa-check"></i>';
                this.db.followUser(this.profile.sub, callback);
            } else {
                element.innerHTML = 'Follow';
                this.db.unfollowUser(this.profile.sub, callback);
            }
        });
    }

}
