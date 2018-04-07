import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CoActivity} from '../../../shared/models/co_activity.model';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: CoActivity[];

    liked: boolean;

  constructor() { }

  ngOnInit() {
      this.liked = false;
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
