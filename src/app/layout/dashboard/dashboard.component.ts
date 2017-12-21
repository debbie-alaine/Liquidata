import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];

    constructor() {
        this.alerts.push({
            id: 1,
            type: 'success',
            message: `Welcome to Liquidatum! Take some time to fill out your profile so our companies can get to know you better.`
        },
            {id: 2,
            type: 'success',
            message: 'Woo-hoo! Google approved your application.'});
    }

    ngOnInit() {
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
