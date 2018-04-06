import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserActivity} from '../shared/models/user_activity.model';

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
    private userActivity: UserActivity[];
    showSpinner = true;

    constructor(private route: ActivatedRoute, private db: DbService, private router: Router) {
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

    onReceiveId(id: string) {
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
}
