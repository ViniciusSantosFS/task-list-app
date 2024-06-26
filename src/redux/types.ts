export interface InitialState {
    tasks: Task[]
    users: Owner[]
}

export interface Task {
    title: string
    type: string
    owner: Owner
    description: string
    beginDate: Date
    endDate: Date
    deliveryDate: Date
}

export interface Owner {
    name: string
    email: string
}
