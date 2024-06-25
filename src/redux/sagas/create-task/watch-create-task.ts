import { put, takeLatest } from 'redux-saga/effects'
import { CreateTask } from 'src/dto/create-task'
import { isBefore } from 'date-fns'
import { CreateTaskActionTypes } from './action-types'

interface CreateTaskAction {
    type: string
    payload: CreateTask
}

export function* createTask({ payload }: CreateTaskAction) {
    try {
        if (
            !isBefore(payload.beginDate, payload.endDate) ||
            !isBefore(payload.beginDate, payload.deliveryDate)
        ) {
            yield put({
                type: CreateTaskActionTypes.CREATE_TASK_FAILURE,
                payload: {
                    message: 'begindDate lesser than endDate or deliveryDate',
                },
            })
        }
        yield put({ type: CreateTaskActionTypes.CREATE_TASK_SUCCESS })
    } catch (error) {
        console.log('ERROR', error)
    }
}

export function* watchCreateTask() {
    yield takeLatest('CREATE_TASK', createTask)
}
