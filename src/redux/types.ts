import { Task } from 'src/entity/task'

export interface InitialState {
    tasks: Task[]
    users: Owner[]
}

export interface Owner {
    name: string
    email: string
}
