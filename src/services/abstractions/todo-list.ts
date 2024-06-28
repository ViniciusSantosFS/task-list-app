import { CreateTask } from 'src/dto/create-task'

export abstract class ITodoListService {
    abstract getAll(): Promise<CreateTask[]>
}
