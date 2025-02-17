interface ITask {
    id: string
    title: string
    type: string
    ownerName: string
    ownerEmail: string
    description: string
    beginDate: string
    endDate: string
    deliveryDate: string
}

export class Task {
    id: string
    title: string
    type: string
    ownerName: string
    ownerEmail: string
    description: string
    beginDate: string
    endDate: string
    deliveryDate: string
    done: boolean

    constructor({
        id,
        title,
        type,
        ownerName,
        ownerEmail,
        description,
        beginDate,
        endDate,
        deliveryDate,
    }: ITask) {
        this.id = id
        this.title = title
        this.type = type
        this.ownerName = ownerName
        this.ownerEmail = ownerEmail
        this.description = description
        this.beginDate = beginDate
        this.endDate = endDate
        this.deliveryDate = deliveryDate
        this.done = false
    }
}
