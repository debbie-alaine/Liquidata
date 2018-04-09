import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {CoActivity} from '../../../shared/models/co_activity.model';
import {Observable} from 'rxjs/Observable';
import {DbService} from '../../../db/db.service';
import {AuthService} from '../../../auth/auth.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: CoActivity[];
    userId: string;
    discounts = [];
    like1 = 'Like <i class="fa fa-thumbs-o-up"></i>';

  constructor(private db: DbService, private auth: AuthService) { }

  ngOnInit() {
      if (this.auth.userProfile) {
          this.userId = this.auth.userProfile.sub;
          this.discounts = this.db.getDiscountsFromUser(this.userId);
      } else {
          this.auth.getProfile((err, profile) => {
              this.userId = profile.sub;
              this.discounts = this.db.getDiscountsFromUser(this.userId);
          })}
  }

  isLiked(discount_id, idElement) {
      const element = document.getElementById(idElement);
      const like = 'Like <i class="fa fa-thumbs-o-up"></i>';
      const liked = 'Liked <i class="fa fa-thumbs-up"></i>';

      if (element.innerHTML === like) {
               element.innerHTML = liked;
              this.db.likePost(this.userId, discount_id)

          } else {
              element.innerHTML = like;
              this.db.unlikePost(this.userId, discount_id)
          }
  }
}
