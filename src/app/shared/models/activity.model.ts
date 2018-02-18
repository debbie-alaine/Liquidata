export class Activity {
    public activity_description;
    public discount_id;
    public discount_description;
    public discount_company;
    public timestamp;

    constructor(acitivty_description, discount_id, discount_description, discount_comoany, timestamp) {
        this.activity_description = acitivty_description;
        this.discount_id = discount_id;
        this.discount_description = discount_description;
        this.discount_company = discount_comoany;
        this.timestamp = timestamp;
    }
}
