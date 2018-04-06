///<reference path="../db/db.service.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute} from '@angular/router';
import {CoActivity} from '../shared/models/co_activity.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
    animations: [routerTransition()]
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

    private routeSub: any;
    public companyName: string;
    public companyURL: string;
    private companyActivity: CoActivity[];
    showSpinner = true;

    constructor(private route: ActivatedRoute, private db: DbService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe( async params => {
            this.companyName = params['id'];
            await this.db.getCompanyId(this.companyName, callback => this.onReceiveId(callback));
        });
    }

    onReceiveId(id: string) {
        this.db.getCompanyActivityByCompanyId(id).then(activity => {
            this.companyActivity = activity;
        });
        this.db.getCompanyProfilePicture(id).then(url => {
            this.companyURL = url[0];
        });
        this.showSpinner = false;
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
