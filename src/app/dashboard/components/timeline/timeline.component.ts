import { Component, OnInit, Input } from '@angular/core';
import {Activity} from '../../../shared/models/activity.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: Activity[];
    @Input() user_id;

  constructor() { }

  ngOnInit() {
  }

}
