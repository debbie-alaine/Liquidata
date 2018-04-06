import {Component, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../db/db.service';
import { UserActivity } from '../shared/models/user_activity.model';
import { DialogComponent} from '../shared/components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-datahub',
  templateUrl: './datahub.component.html',
  styleUrls: ['./datahub.component.scss'],
    animations: [routerTransition()]
})
export class DatahubComponent implements OnInit {

    history: UserActivity[];
    showSpinner = true;
    noActivity: boolean;

    constructor(private db: DbService, private auth: AuthService, public dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.history = this.db.getDatahubActivityFromUser(this.auth.userProfile.sub);
            this.showSpinner = false;
            this.noActivity = (this.history.length === 0);
        } else {
            this.auth.getProfile((err, profile) => {
                this.history = this.db.getDatahubActivityFromUser(profile.sub);
                this.showSpinner = false;
                this.noActivity = (this.history.length === 0);
            });
        }
    }

    openDialog(dataPlatform) {
        this.dialog.open(DialogComponent, {
            data: { dataPlatform: dataPlatform }
            });
    }
}
