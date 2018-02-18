import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';
import {DbService} from '../db/db.service';
import {Discount} from '../shared/models/discount.model';

@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.scss'],
    animations: [routerTransition()],
})
export class DiscountComponent implements OnInit {

    discounts: Discount[];

    constructor(private db: DbService) {
    }

    ngOnInit() {
        this.discounts = this.db.getDiscountsFromUser('u1234')
        console.log(this.discounts);
    }
}
