export class CreateTask {
    constructor(
        public title: string,
        public type: string,
        public owner: string,
        public description: string,
        public beginDate: string,
        public endDate: string,
        public deliveryDate: string
    ) {}
}
