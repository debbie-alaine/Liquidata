import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import { routerTransition} from '../router.animations';
import { DbService } from '../db/db.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
    animations: [routerTransition()]
})
export class SearchResultsComponent implements OnInit, OnDestroy {

    companies: string[];
    showSpinner = true;
    private routeSub: any;
    private searchValue: string;

    constructor(private route: ActivatedRoute, private db: DbService) {
        this.routeSub = this.route.queryParams.subscribe(params => {
            this.searchValue = params['value'];

            this.db.getCompanyList(this.searchValue).then(
                (results) => {
                    this.companies = results;
                    this.showSpinner = false;
                }
            );
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }

}
