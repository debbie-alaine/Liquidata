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
            const companyId = await this.db.getCompanyId(this.companyName)[0];
            console.log('Company ID: ' + companyId);
            this.companyActivity = await this.db.getCompanyActivityByCompanyId(companyId);
            this.companyURL = await this.db.getCompanyProfilePicture(companyId)[0];
            this.showSpinner = false;
            });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
