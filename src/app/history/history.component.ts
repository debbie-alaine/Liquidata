import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {AuthService} from '../auth/auth.service';
import {UserActivity} from '../shared/models/user_activity.model';
import {DbService} from '../db/db.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    animations: [routerTransition()]
})
export class HistoryComponent implements OnInit {

    history: UserActivity[];
    showSpinner = true;
    noActivity: boolean;

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.history = this.db.getHistoryFromUser(this.auth.userProfile.sub);
            this.showSpinner = false;
            this.noActivity = (this.history.length === 0);
        } else {
            this.auth.getProfile((err, profile) => {
                this.history = this.db.getHistoryFromUser(profile.sub);
                this.showSpinner = false;
                this.noActivity = (this.history.length === 0);
            });
        }
    }
}
