import {Component, OnInit, Input} from '@angular/core';
import {CoActivity} from '../../../shared/models/co_activity.model';
import {DbService} from '../../../db/db.service';
import {AuthService} from '../../../auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {DialogTimelineComponent} from '../../../shared/components/dialog-timeline/dialog-timeline.component';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

    @Input() following_activity: CoActivity[];
    userId: string;
    discounts = [];

  constructor(private db: DbService, private auth: AuthService, public dialog: MatDialog) { }

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

  isLiked(activity, idElement) {
      const element = document.getElementById(idElement);

      if (element.innerText === 'Like ') {
              this.dialog.open(DialogTimelineComponent, {
                  data: {
                      user_id: this.userId,
                      discount_id: activity.discount_id,
                      coupon_desc: activity.coupon_desc,
                      data_desc: activity.data_desc,
                      discount_company: activity.discount_company,
                      data_platform: activity.data_platform,
                      isLiked: true
                  }
              });

          } else {
          this.dialog.open(DialogTimelineComponent, {
              data: {
                  user_id: this.userId,
                  discount_id: activity.discount_id,
                  coupon_desc: activity.coupon_desc,
                  data_desc: activity.data_desc,
                  discount_company: activity.discount_company,
                  data_platform: activity.data_platform,
                  isLiked: false
              }
          });
      }
  }
}
