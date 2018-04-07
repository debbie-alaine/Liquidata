///<reference path="../db/db.service.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute} from '@angular/router';
import {CoActivity} from '../shared/models/co_activity.model';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
    animations: [routerTransition()]
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

    private routeSub: any;
    public companyName: string;
    public companyURL: string;
    public companyId: string;
    private companyActivity: CoActivity[];
    showSpinner = true;
    following = [];
    profile: any;

    constructor(private route: ActivatedRoute, private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe( async params => {
            this.companyName = params['id'];
            await this.db.getCompanyId(this.companyName, callback => this.onReceiveId(callback));
            if (this.auth.userProfile) {
                this.profile = this.auth.userProfile;
                await this.db.getFollowingCompanies(this.auth.userProfile.sub, callback => this.updateIsFollowed(callback));
            } else {
                this.auth.getProfile(async (err, profile) => {
                    this.profile = profile;
                    await this.db.getFollowingCompanies(this.profile.sub, callback => this.updateIsFollowed(callback));
                });
            }
        });
    }

    updateIsFollowed(companies: string[]) {
        this.following = companies;
    }

    onReceiveId(id: string) {
        this.companyId = id;
        this.db.getCompanyActivityByCompanyId(id).then(activity => {
            this.companyActivity = activity;
        });
        this.db.getCompanyProfilePicture(id).then(url => {
            this.companyURL = url[0];
        });
        this.showSpinner = false;
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    followClick(idElement) {
        const element = document.getElementById(idElement);
        if (element.innerText === 'Follow') {
            element.innerHTML = 'Followed <i class="fa fa-check"></i>';
            this.db.followCompany(this.companyId, this.profile.sub);
        } else {
            element.innerHTML = 'Follow';
            this.db.unfollowCompany(this.companyId, this.profile.sub);
        }
    }
}
