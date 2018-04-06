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
            const userId = await this.db.getUserId(this.userName)[0];
            console.log('User ID: ' + userId);
            this.userActivity = await this.db.getUserActivityByUserId(userId);
            this.userURL = await this.db.getUserProfilePicture(userId)[0];
            this.showSpinner = false;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    // TODO: check that company exists before loading
    public checkCompanyNameExists(companyName) {
        return true;
    }
}
