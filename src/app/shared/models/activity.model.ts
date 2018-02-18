export class Activity {
    public status;
    public discount_id;
    public discount_description;
    public discount_company;
    public timestamp;

    constructor(status, discount_id, discount_description, discount_company, timestamp) {
        this.status = status;
        this.discount_id = discount_id;
        this.discount_description = discount_description;
        this.discount_company = discount_company;
        this.timestamp = timestamp;
    }
}
