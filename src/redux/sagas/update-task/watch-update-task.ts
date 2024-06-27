import { put, select, takeLatest } from 'redux-saga/effects'
import { InitialState } from 'src/redux/types'
import { Task } from 'src/entity/task'
import { UpdateTaskActionTypes } from './action-types'

interface UpdateTaskAction {
    type: string
    payload: Task
}

export function* updateTask({ payload }: UpdateTaskAction) {
    const tasks: Task[] = yield select((state: InitialState) => state.tasks)
    const updatedTasks = tasks.map((task) =>
        task.id === payload.id ? payload : task
    )

    yield put({
        type: UpdateTaskActionTypes.UPDATE_TASK_SUCCESS,
        payload: updatedTasks,
    })
    return
}

export function* watchUpdateTask() {
    yield takeLatest(UpdateTaskActionTypes.UPDATE_TASK, updateTask)
}
