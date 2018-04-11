import { MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog-datahub.component.html',
    styleUrls: ['./dialog-datahub.component.scss'],
    providers: [FacebookService]
})
export class DialogDatahubComponent {
    isSuccess: boolean;

    constructor(public dialogRef: MatDialogRef<DialogDatahubComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FacebookService) {
        this.isSuccess = false;
    }

    facebook_login() {
            const initParams: InitParams = {
                appId: environment.facebook.appId,
                xfbml: false,
                version: 'v2.12'
            };

            this.fb.init(initParams);
            console.log('Facebook Initiated!')

            this.fb.login()
                .then((response: LoginResponse) => {
                    console.log('Logged in', response);
                    // DO SOMETHING WITH DATA
                    this.fb.logout();
                    console.log('Logging out');
                    this.isSuccess = true;
                })
                .catch(e => console.error('Error logging in'));
    }

    ok() {
        this.dialogRef.close();
        this.isSuccess = false;
    }

}
