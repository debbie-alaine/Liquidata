export class CoActivity {
    public discount_id;
    public coupon_desc;
    public data_desc;
    public discount_company;
    public data_platform;
    public timestamp;

    constructor(discount_id, coupon_desc, data_desc, discount_company, data_platform, timestamp) {
        this.discount_id = discount_id;
        this.coupon_desc = coupon_desc;
        this.data_desc = data_desc;
        this.discount_company = discount_company;
        this.data_platform = data_platform;
        this.timestamp = timestamp;
    }
}
