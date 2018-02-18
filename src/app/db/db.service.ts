import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Discount} from '../shared/models/discount.model';
import {AuthService} from '../auth/auth.service';


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

}
