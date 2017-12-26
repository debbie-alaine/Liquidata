import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-discount',
    templateUrl: './discount.component.html',
    styleUrls: ['./discount.component.scss'],
    animations: [routerTransition()]
})
export class DiscountComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}
