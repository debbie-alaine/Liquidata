import { MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FacebookService, InitParams, LoginResponse} from 'ngx-facebook';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    providers: [FacebookService]
})
export class DialogComponent {

    constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
                private fb: FacebookService) { }

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

    confirm() {
        this.login(this.data.dataPlatform);
        this.dialogRef.close();
    }

}
