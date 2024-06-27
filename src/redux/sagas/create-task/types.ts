import { CreateTask } from 'src/dto/create-task'

export interface CreateTaskAction {
    type: string
    payload: CreateTask
    navigate: (path: string) => void
}
