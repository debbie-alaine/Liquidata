export class UserActivity {
    public status;
    public discount_id;
    public discount_description;
    public data_description;
    public discount_company;
    public data_platform;
    public timestamp;

    constructor(status, discount_id, discount_description, data_description, discount_company,
                data_platform, timestamp) {
        this.status = status;
        this.discount_id = discount_id;
        this.discount_description = discount_description;
        this.data_description = data_description;
        this.discount_company = discount_company;
        this.data_platform = data_platform;
        this.timestamp = timestamp;
    }
}
