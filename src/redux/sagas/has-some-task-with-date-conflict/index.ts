import { CreateUser } from 'src/dto/create-user'
import { select } from 'redux-saga/effects'
import { CreateTask } from 'src/dto/create-task'
import { InitialState } from 'src/redux/types'

export function* hasSomeTaskWithDateConflict(
    owner: CreateUser,
    payload: CreateTask
) {
    const tasks: CreateTask[] = yield select(
        (state: InitialState) => state.tasks
    )

    const usersTask = tasks.filter((task) => task.owner === owner.email)

    return usersTask.find((task) => {
        return (
            task.beginDate === payload.beginDate ||
            task.endDate === payload.endDate ||
            task.deliveryDate === payload.deliveryDate
        )
    })
}
