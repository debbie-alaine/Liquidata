import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../router.animations';

@Component({
  selector: 'app-company-request',
  templateUrl: './company-request.component.html',
  styleUrls: ['./company-request.component.scss'],
    animations: [routerTransition()]
})
export class CompanyRequestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
