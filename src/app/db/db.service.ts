import { AngularFireDatabase} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Discount} from '../shared/models/discount.model';
import {UserActivity} from '../shared/models/user_activity.model';
import {CoActivity} from '../shared/models/co_activity.model';

@Injectable()
export class DbService {

    constructor(private db: AngularFireDatabase) {
    }

    getApprovedDiscountsFromUser(user_id): Discount[] {

        const discounts = [];

        const user_discounts = this.db.database.ref().child('/users/' + user_id + '/discounts');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_discounts.on('child_added', d_user => {
            discount_info.child(d_user.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {
                    if (d_user.val().status === 'Approved') {
                        const discount = new Discount(d_user.val().code, co_detail.val().username, d_detail.val().coupon_desc);
                        discounts.push(discount);
                    }
                });
            });
        });

        return discounts;
    }

    getProfileActivityFromUser(user_id): UserActivity[] {
        const discount_activity = [];
        const user_history = this.db.database.ref().child('/users/' + user_id + '/discounts');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_history.on('child_added', activity => {
            discount_info.child(activity.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {

                    if (activity.val().status !== 'Denied') {
                        discount_activity.push(new UserActivity(
                            activity.val().status,
                            activity.val().discount_id,
                            d_detail.val().coupon_desc,
                            d_detail.val().data_desc,
                            co_detail.val().username,
                            d_detail.val().data_platform,
                            new Date(activity.val().timestamp)
                        ));
                    }
                })
            });
        });


        return discount_activity;
    }

    getHistoryFromUser(user_id): UserActivity[] {
        const history = [];
        const user_history = this.db.database.ref().child('/users/' + user_id + '/discounts');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_history.on('child_added', activity => {
            discount_info.child(activity.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {
                    history.push(new UserActivity(
                        activity.val().status,
                        activity.val().discount_id,
                        d_detail.val().coupon_desc,
                        d_detail.val().data_desc,
                        co_detail.val().username,
                        d_detail.val().data_platform,
                        new Date(activity.val().timestamp)
                    ));
                })
            });
        });


        return history;
    }

    getFollowingActivityFromUser(user_id): CoActivity[] {
        const following_activity = [];
        const co_following = this.db.database.ref().child('/users/' + user_id + '/co_following');
        const discounts = this.db.database.ref().child('/discounts');
        const company = this.db.database.ref().child('/company');

        co_following.on('child_added', company_id => {
                company.child(company_id.val()).once('value', company_detail => {
                    for (const d of company_detail.val().discounts) {
                        discounts.child(d).once('value', d_detail => {
                            company.child(d_detail.val().company_id).once('value', co_detail => {
                                following_activity.push(new CoActivity(
                                    d_detail.val().discount_id,
                                    d_detail.val().coupon_desc,
                                    d_detail.val().data_desc,
                                    co_detail.val().username,
                                    d_detail.val().data_platform,
                                    new Date(d_detail.val().timestamp)
                                ));
                            });
                        });
                    }
                });
        });
        return following_activity;
    }

}
