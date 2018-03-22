import {Component, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../db/db.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CoActivity} from '../shared/models/co_activity.model';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
    animations: [routerTransition()]
})
export class CompanyDetailComponent implements OnInit, OnDestroy {

    private routeSub: any;
    private companyName: string;
    private companyActivity: CoActivity[];
    showSpinner = true;

    constructor(private route: ActivatedRoute, private db: DbService, private router: Router) {
    }

    ngOnInit() {

        if (!this.checkCompanyNameExists(this.companyName)) {
            this.router.navigate(['/not-found']);
        }

        this.routeSub = this.route.params.subscribe(params => {
            this.companyName = params['id'];
            this.companyActivity = this.db.getCompanyActivity(this.companyName);
            this.showSpinner = false;
        })
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

    checkCompanyNameExists(companyName) {
        return true;
    }
}
