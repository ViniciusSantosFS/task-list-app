interface ITask {
    title: string
    type: string
    ownerName: string
    description: string
    beginDate: Date
    endDate: Date
    deliveryDate: Date
}

export class Task {
    title: string
    type: string
    ownerName: string
    description: string
    beginDate: Date
    endDate: Date
    deliveryDate: Date

    constructor({
        title,
        type,
        ownerName,
        description,
        beginDate,
        endDate,
        deliveryDate,
    }: ITask) {
        this.title = title
        this.type = type
        this.ownerName = ownerName
        this.description = description
        this.beginDate = beginDate
        this.endDate = endDate
        this.deliveryDate = deliveryDate
    }
}
