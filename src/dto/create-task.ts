export class CreateTask {
    constructor(
        public title: string,
        public type: string,
        public owner: string,
        public description: string,
        public beginDate: Date,
        public endDate: Date,
        public deliveryDate: Date
    ) {}
}
