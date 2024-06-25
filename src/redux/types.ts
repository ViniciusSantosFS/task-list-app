export interface Task {
    title: string
    type: string
    owner: string
    description: string
    beginDate: Date
    endDate: Date
    deliveryDate: Date
}

export interface InitialState {
    tasks: Task[]
}
