import { Component, OnInit, Input } from '@angular/core';
import {UserActivity} from '../../../shared/models/user_activity.model';
import {CoActivity} from '../../../shared/models/co_activity.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: CoActivity[];
    @Input() user_id;

  constructor() { }

  ngOnInit() {
  }

}
