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

    // For Discount Page: user has been approved and data submitted.
    getCompletedDiscountsFromUser(user_id): Discount[] {

        const discounts = [];

        const user_discounts = this.db.database.ref().child('/users/' + user_id + '/discounts');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_discounts.on('child_added', d_user => {
            discount_info.child(d_user.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {
                    if (d_user.val().status === 'Data Submitted') {
                        const discount = new Discount(d_user.val().code, co_detail.val().username, d_detail.val().coupon_desc);
                        discounts.push(discount);
                    }
                });
            });
        });

        return discounts;
    }

    // For Profile Page: User activity, except denials.
    async getUserActivityByUserId(user_id) {
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

    // For Profile Page: all Company activity
    async getCompanyActivityByCompanyId(company_id) {
        const company_activity = [];
        const company_history = this.db.database.ref().child('/company/' + company_id + '/discounts');
        const discounts = this.db.database.ref().child('/discounts');

        company_history.on('child_added', company  => {
            discounts.child(company.val()).once('value', d_detail => {
                    company_activity.push(new CoActivity(
                        d_detail.val().discount_id,
                        d_detail.val().coupon_desc,
                        d_detail.val().data_desc,
                        company.val().username,
                        d_detail.val().data_platform,
                        new Date(d_detail.val().timestamp),
                        d_detail.val().profile_pic
                    ));
                });
        });
        return company_activity;
    }

    async getUserId(username, callback) {
        const users = this.db.database.ref().child('/users');

        users.orderByChild('username').equalTo(username).on('child_added', snapshot => {
            callback(snapshot.key);
        });
    }

     async getCompanyId(username, callback) {
        const companies = this.db.database.ref().child('/company');

         companies.orderByChild('username').equalTo(username).on('child_added', snapshot => {
             callback(snapshot.key);
        });
    }

    async searchByCompany(searchValue: string) {
        const companies = [];
        const company_info = this.db.database.ref().child('/company');

        company_info.orderByChild('username').equalTo(searchValue)
            .on('child_added', results => {
                companies.push(results.val().username);
            });

        return companies;
    }

    async searchByUser(searchValue: string) {
        const users = [];
        const user_info = this.db.database.ref().child('/users');

        user_info.orderByChild('username').equalTo(searchValue)
            .on('child_added', snapshot => {
                users.push(snapshot.val().username);
            });

        return users;
    }

    // For History Page: All user activity.
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

    // For Datahub Page: All approved activity pending data submission.
    getDatahubActivityFromUser(user_id): UserActivity[] {
        const datahub_activity = [];
        const user_history = this.db.database.ref().child('/users/' + user_id + '/discounts');
        const discount_info = this.db.database.ref().child('/discounts');
        const company_info = this.db.database.ref().child('/company');

        user_history.on('child_added', activity => {
            discount_info.child(activity.val().discount_id).once('value', d_detail => {
                company_info.child(d_detail.val().company_id).once('value', co_detail => {

                    if (activity.val().status === 'Approved') {
                        datahub_activity.push(new UserActivity(
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


        return datahub_activity;
    }

    // For Dashboard Page: All company activity a user follows
    // TODO: sort by timestamp
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
                                    new Date(d_detail.val().timestamp),
                                    d_detail.val().profile_pic
                                ));
                            });
                        });
                    }
                });
        });
        return following_activity;
    }

    async getCompanyProfilePicture(company_id) {
        const result = [];
        const url = this.db.database.ref().child('/company/' + company_id + '/profile_pic');

        url.on('value', pic  => {
            result.push(pic.val());
        });

        return result;
    }

    async getUserProfilePicture(userId) {
        const result = [];
        const url = this.db.database.ref().child('/users/' + userId + '/profile_pic');

        url.on('value', pic  => {
            result.push(pic.val());
        });

        return result;
    }

    async getFollowingCompanies(user_id, callback) {
        const following = [];
        const co_following = this.db.database.ref().child('/users/' + user_id + '/co_following');
        const company = this.db.database.ref().child('/company');

        co_following.on('child_added', company_id => {
            company.child(company_id.val()).once('value', company_detail => {
                following.push(company_detail.val().username);
            });
        });
        callback(following);
    }

    async getFollowingUsers(user_id, callback) {
        const following = [];
        const user_following = this.db.database.ref().child('/users/' + user_id + '/user_following');
        const users = this.db.database.ref().child('/users');

        user_following.on('child_added', uid => {
            users.child(uid.val()).once('value', user_detail => {
                following.push(user_detail.val().username);
            });
        });
        callback(following);
    }

    unfollowCompany(company_id: string, user_id: string) {
        const companies = this.db.database.ref().child('/users/' + user_id + '/co_following/');

        companies.once('value', id => {
            id.forEach(snapshot => {
                if (company_id === snapshot.val()) {
                    companies.ref.child(snapshot.key).remove(function(error) {
                        if (error) {
                            console.log('Data could not be removed.' + error);
                        } else {
                            console.log('Data removed successfully.');
                        }});
                }
                return false;
            });
        });

    }

    followCompany(company_id: string, user_id: string) {
        const companies = this.db.database.ref().child('/users/' + user_id + '/co_following/');

        companies.push( company_id, function(error) {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                console.log('Data saved successfully.');
            }
        });

        return(companies);
    }

    unfollowUser(user_id: string, other_user_id: string) {
    const users = this.db.database.ref().child('/users/' + user_id + '/user_following/');

        users.once('value', id => {
            id.forEach(snapshot => {
                if (other_user_id === snapshot.val()) {
                    users.ref.child(snapshot.key).remove(function(error) {
                        if (error) {
                            console.log('Data could not be removed.' + error);
                        } else {
                            console.log('Data removed successfully.');
                        }});
                }
                return false;
            });
        });

    }

    followUser(user_id: string, other_user_id: string) {
        const users = this.db.database.ref().child('/users/' + user_id + '/user_following/');

        users.push(other_user_id, function(error) {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                console.log('Data saved successfully.');
            }
        });
    }

    likePost(user_id: string, discount_id) {
        const users = this.db.database.ref().child('/users/' + user_id + '/discounts/');
        const like_json = {
                'code': 'pending',
                'discount_id': discount_id,
                'status': 'Applied',
                'timestamp': Date.now()
            };
        const discount_json = {
            'code': 'pending',
            'status': 'Approved',
        };

        users.push(like_json, function(error) {
            if (error) {
                console.log('Data could not be saved.' + error);
            } else {
                console.log('Data saved successfully.');
            }
        }).then(d_id => {
            setTimeout(() => {
                console.log('done waiting...' + d_id);
                d_id.update(discount_json, function(er) {
                    if (er) {
                        console.log('Data could not be saved.' + er);
                    } else {
                        console.log('Data saved successfully.');
                    }});
            }, 5000);
        });
    }

    unlikePost(user_id: string, discount_id) {
        const users = this.db.database.ref().child('/users/' + user_id + '/discounts/');

        users.once('value', id => {
            id.forEach(snapshot => {
                if (discount_id === snapshot.val().discount_id) {
                    users.ref.child(snapshot.key).remove(function(error) {
                        if (error) {
                            console.log('Data could not be removed.' + error);
                        } else {
                            console.log('Data removed successfully.');
                        }});
                }
                return false;
            });
        });
    }

    getDiscountsFromUser(user_id): UserActivity[] {
        const history = [];
        const user_history = this.db.database.ref().child('/users/' + user_id + '/discounts');

        user_history.on('child_added', activity => {
            history.push(activity.val().discount_id);
        });

        user_history.on('child_removed', activity => {
            const index = history.indexOf(activity.val().discount_id, 0);
            if (index > -1) {
                history.splice(index, 1);
            }
        });

        return history;
    }
}
