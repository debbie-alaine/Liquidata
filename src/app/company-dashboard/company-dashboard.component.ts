import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss'],
    animations: [routerTransition()]
})
export class CompanyDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
