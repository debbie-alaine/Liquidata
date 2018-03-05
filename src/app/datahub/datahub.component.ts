import {Component, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { FacebookService, InitParams, LoginResponse } from 'ngx-facebook';
import { environment } from 'environments/environment';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../db/db.service';
import { UserActivity } from '../shared/models/user_activity.model';
import { DialogComponent} from '../shared/components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-datahub',
  templateUrl: './datahub.component.html',
  styleUrls: ['./datahub.component.scss'],
    animations: [routerTransition()],
    providers: [FacebookService]
})
export class DatahubComponent implements OnInit {

    history: UserActivity[];
    showSpinner = true;

    constructor(private db: DbService, private auth: AuthService, private fb: FacebookService,
                public dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.history = this.db.getHistoryFromUser(this.auth.userProfile.sub);
            this.showSpinner = false;
        } else {
            this.auth.getProfile((err, profile) => {
                this.history = this.db.getHistoryFromUser(profile.sub);
                this.showSpinner = false;
            });
        }
    }

    login(dataPlatform) {
        if (dataPlatform === 'Facebook') {
            const initParams: InitParams = {
                appId: environment.facebook.appId,
                xfbml: false,
                version: 'v2.12'
            };

            this.fb.init(initParams);
            console.log('Facebook Initiated!')

            this.fb.login()
                .then((response: LoginResponse) => console.log('Logged in', response))
                .catch(e => console.error('Error logging in'));
        }
    }

    openDialog() {
        this.dialog.open(DialogComponent);
    }
}
