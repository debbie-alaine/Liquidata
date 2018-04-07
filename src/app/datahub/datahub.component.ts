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

    constructor(private db: DbService, private auth: AuthService, public dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.history = this.db.getDatahubActivityFromUser(this.auth.userProfile.sub);
            this.removeSpinner();
        } else {
            this.auth.getProfile((err, profile) => {
                this.history = this.db.getDatahubActivityFromUser(profile.sub);
                this.removeSpinner();
            });
        }
    }

    openDialog(dataPlatform) {
        this.dialog.open(DialogComponent, {
            data: { dataPlatform: dataPlatform }
            });
    }

    removeSpinner() {
        if (this.history.length === 0) {
            setTimeout(cb => { this.showSpinner = false}, 300)
        } else {
            this.showSpinner = false;
        }
    }
}
