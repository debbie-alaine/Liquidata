import { Component, OnInit } from '@angular/core';
import { routerTransition} from '../router.animations';
import { AuthService } from '../auth/auth.service';
import { DbService } from '../db/db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss'],
    animations: [routerTransition()]
})
export class CompanyDetailComponent implements OnInit {

    showSpinner = true;

    constructor(private route: ActivatedRoute, private db: DbService, private auth: AuthService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params);
        })
    }
}
