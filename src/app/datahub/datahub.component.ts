import { Component, OnInit } from '@angular/core';
import {routerTransition} from '../router.animations';
import { FacebookService, InitParams } from 'ngx-facebook';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-datahub',
  templateUrl: './datahub.component.html',
  styleUrls: ['./datahub.component.scss'],
    animations: [routerTransition()],
    providers: [FacebookService]
})
export class DatahubComponent implements OnInit {

  constructor(private fb: FacebookService) {
      const initParams: InitParams = {
          appId: environment.facebook.appId,
          xfbml: false,
          version: 'v2.12'
      };

      fb.init(initParams);
      console.log('Facebook Initiated!')
  }

  ngOnInit() {
  }

}
