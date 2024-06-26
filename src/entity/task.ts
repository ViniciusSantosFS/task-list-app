interface ITask {
    id: string
    title: string
    type: string
    ownerName: string
    description: string
    beginDate: Date
    endDate: Date
    deliveryDate: Date
}

export class Task {
    id: string
    title: string
    type: string
    ownerName: string
    description: string
    beginDate: Date
    endDate: Date
    deliveryDate: Date
    done: boolean

    constructor({
        id,
        title,
        type,
        ownerName,
        description,
        beginDate,
        endDate,
        deliveryDate,
    }: ITask) {
        this.id = id
        this.title = title
        this.type = type
        this.ownerName = ownerName
        this.description = description
        this.beginDate = beginDate
        this.endDate = endDate
        this.deliveryDate = deliveryDate
        this.done = false
    }
}
