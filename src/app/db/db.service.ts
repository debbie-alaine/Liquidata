import { AngularFireDatabase} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Discount} from '../shared/models/discount.model';
import {Activity} from '../shared/models/activity.model';

@Injectable()
export class DbService {

    constructor(private db: AngularFireDatabase) {
    }

    getDiscountsFromUser(user_id): Discount[] {

        const discounts = [];

        const user_discounts = this.db.database.ref().child('/users/' + user_id + '/discounts');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_discounts.on('child_added', d_user => {
            discount_info.child(d_user.val()).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {
                    const discount = new Discount(d_detail.val().code, co_detail.val().name, d_detail.val().description);
                    discounts.push(discount);
                })
            });
        });

        return discounts;
    }

    getHistoryFromUser(user_id): Activity[] {
        const history = [];

        const user_history = this.db.database.ref().child('/activity/' + user_id + '/history');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_history.on('child_added', activity => {
            discount_info.child(activity.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {
                    history.push(new Activity(
                        activity.val().status,
                        activity.val().discount_id,
                        d_detail.val().description,
                        co_detail.val().name,
                        activity.val().timestamp
                    ))
                })
            });
        });


        return history;
    }

    getActiveDiscountsFromUser(user_id): Activity[] {
        const discount_activity = [];

        const user_history = this.db.database.ref().child('/activity/' + user_id + '/history');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_history.on('child_added', activity => {
            discount_info.child(activity.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {

                    if (activity.val().status === 'Approved' || activity.val().status === 'Applied') {
                        discount_activity.push(new Activity(
                            activity.val().status,
                            activity.val().discount_id,
                            d_detail.val().description,
                            co_detail.val().name,
                            activity.val().timestamp
                        ));
                    }
                })
            });
        });


        return discount_activity;
    }

}
