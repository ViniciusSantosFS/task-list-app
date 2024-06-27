import { CreateUser } from 'src/dto/create-user'
import { select } from 'redux-saga/effects'
import { CreateTask } from 'src/dto/create-task'
import { InitialState } from 'src/redux/types'
import { Task } from 'src/entity/task'

export function* hasSomeTaskWithDateConflict(
    owner: CreateUser,
    payload: CreateTask
) {
    const tasks: Task[] = yield select((state: InitialState) => state.tasks)

    const usersTask = tasks.filter((task) => task.ownerEmail === owner.email)

    return usersTask.find((task) => {
        return (
            task.beginDate === payload.beginDate ||
            task.endDate === payload.endDate ||
            task.deliveryDate === payload.deliveryDate
        )
    })
}
