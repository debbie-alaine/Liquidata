import { Component, OnInit } from '@angular/core';
import {routerTransition} from "../router.animations";

@Component({
  selector: 'app-datahub',
  templateUrl: './datahub.component.html',
  styleUrls: ['./datahub.component.scss'],
    animations: [routerTransition()]
})
export class DatahubComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
