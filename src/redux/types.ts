import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'
import { ApplicationError } from 'src/errors/application-error'

export interface InitialState {
    tasks: Task[]
    users: CreateUser[]
    error: ApplicationError | null
}
