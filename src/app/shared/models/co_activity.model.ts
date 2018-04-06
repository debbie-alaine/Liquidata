export class CoActivity {
    public discount_id;
    public coupon_desc;
    public data_desc;
    public discount_company;
    public data_platform;
    public timestamp;
    public profile_pic;

    constructor(discount_id, coupon_desc, data_desc, discount_company, data_platform, timestamp, profile_pic) {
        this.discount_id = discount_id;
        this.coupon_desc = coupon_desc;
        this.data_desc = data_desc;
        this.discount_company = discount_company;
        this.data_platform = data_platform;
        this.timestamp = timestamp;
        this.profile_pic = profile_pic;
    }
}
