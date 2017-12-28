import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
    animations: [routerTransition()]
})
export class HistoryComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}
