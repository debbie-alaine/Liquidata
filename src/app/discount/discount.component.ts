import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {DbService} from '../db/db.service';
import {Discount} from '../shared/models/discount.model';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.scss'],
    animations: [routerTransition()],
})
export class DiscountComponent implements OnInit {

    discounts: Discount[];
    showSpinner = true;
    noActivity: boolean;

    constructor(private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        if (this.auth.userProfile) {
            this.discounts = this.db.getCompletedDiscountsFromUser(this.auth.userProfile.sub);
            this.showSpinner = false;
            this.noActivity = (this.discounts.length === 0);
        } else {
            this.auth.getProfile((err, profile) => {
                this.discounts = this.db.getCompletedDiscountsFromUser(profile.sub);
                this.showSpinner = false;
                this.noActivity = (this.discounts.length === 0);
            });
        }
    }
}
