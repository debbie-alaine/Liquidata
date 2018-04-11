import { MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DbService} from '../../../db/db.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog-timeline.component.html',
    styleUrls: ['./dialog-timeline.component.scss'],
    providers: [FacebookService]
})
export class DialogTimelineComponent {

    constructor(public dialogRef: MatDialogRef<DialogTimelineComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
                private db: DbService) {
    }

    confirm() {
        if (this.data.isLiked) {
            this.db.likePost(this.data.user_id, this.data.discount_id)

        } else {
            this.db.unlikePost(this.data.user_id, this.data.discount_id)
        }

        this.dialogRef.close();
    }

}
