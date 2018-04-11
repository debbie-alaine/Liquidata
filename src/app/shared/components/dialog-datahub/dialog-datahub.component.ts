import { MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {MAT_DIALOG_DATA} from '@angular/material';
import {DbService} from '../../../db/db.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog-datahub.component.html',
    styleUrls: ['./dialog-datahub.component.scss'],
    providers: [FacebookService]
})
export class DialogDatahubComponent {
    isSuccess: boolean;
    isLoading: boolean;

    constructor(public dialogRef: MatDialogRef<DialogDatahubComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FacebookService, private db: DbService) {
        this.isSuccess = false;
        this.isLoading = false;
    }

    facebook_login() {
            const initParams: InitParams = {
                appId: environment.facebook.appId,
                xfbml: false,
                version: 'v2.12'
            };

            this.fb.init(initParams);
            console.log('Facebook Initiated!');

            this.fb.login()
                .then((response: LoginResponse) => {
                    // DO SOMETHING WITH DATA
                    this.fb.logout();
                    this.isSuccess = true;
                })
                .catch(e => console.error('Error logging in'));
    }

    other_login() {
        this.isLoading = true;
        setTimeout(() => {
            this.isSuccess = true;
            this.isLoading = false;
        }, 2000);
    }

    ok() {
        this.db.submitData(this.data.user_id, this.data.discount_id);
        this.dialogRef.close();
        this.isSuccess = false;
    }

}
