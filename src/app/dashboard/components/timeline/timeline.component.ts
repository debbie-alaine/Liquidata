import { Component, OnInit, Input } from '@angular/core';
import {CoActivity} from '../../../shared/models/co_activity.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: CoActivity[];
    @Input() user_id;

  constructor(private route: Router) { }

  ngOnInit() {
  }

  goToCompanyDetailPage(clickedCompany: String) {
      console.log(clickedCompany);
      this.route.navigate(['/company-detail', clickedCompany]);
  };

}
