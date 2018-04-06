import { Component, OnInit, Input } from '@angular/core';
import {CoActivity} from '../../../shared/models/co_activity.model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: CoActivity[];
    @Input() user_id;

    noActivity : boolean;
    liked: boolean;

  constructor() { }

  ngOnInit() {
      this.liked = false;
      this.noActivity = (this.following_activity.length === 0);
  }


  isLiked(idElement) {
      const element = document.getElementById(idElement);
          if (element.innerText === 'Like ') {
              element.innerHTML = 'Liked <i class="fa fa-thumbs-up"></i>';
          } else {
              element.innerHTML = 'Like <i class="fa fa-thumbs-o-up"></i>';
          }
  }

}
