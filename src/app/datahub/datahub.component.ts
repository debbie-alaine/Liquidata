import {Component, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../db/db.service';
import { UserActivity } from '../shared/models/user_activity.model';
import { MatDialog } from '@angular/material/dialog';
import {DialogDatahubComponent} from '../shared/components/dialog-datahub/dialog-datahub.component';
import {TimeAgoPipe} from 'time-ago-pipe';

@Component({
  selector: 'app-datahub',
  templateUrl: './datahub.component.html',
  styleUrls: ['./datahub.component.scss'],
    animations: [routerTransition()]
})
export class DatahubComponent implements OnInit {

    history: UserActivity[];
    submitted: string[];
    showSpinner = true;
    userId: string;

    constructor(private db: DbService, private auth: AuthService, public dialog: MatDialog) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.userId = this.auth.userProfile.sub;
            this.history = this.db.getDatahubActivityFromUser(this.userId);
            this.submitted = this.db.submitListener(this.userId);
            this.removeSpinner();
        } else {
            this.auth.getProfile((err, profile) => {
                this.userId = profile.sub;
                this.history = this.db.getDatahubActivityFromUser(this.userId);
                this.submitted = this.db.submitListener(this.userId);
                this.removeSpinner();
            });
        }
    }

    openDialog(dataPlatform, discount_id, elementId) {
        const element = document.getElementById(elementId);
        this.dialog.open(DialogDatahubComponent, {
            data: { data_platform: dataPlatform,
                    user_id: this.userId,
                    discount_id: discount_id,
                    element: element
            }
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
