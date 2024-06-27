import uuid from 'react-native-uuid'
import { put, select, takeLatest } from 'redux-saga/effects'
import { CreateTask } from 'src/dto/create-task'
import { isBefore } from 'date-fns'
import { CreateTaskActionTypes } from './action-types'
import { InitialState } from 'src/redux/types'
import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'
import { CreateTaskAction } from './types'
import { registerUser } from '../register-user-by-email'
import { hasSomeTaskWithDateConflict } from '../has-some-task-with-date-conflict'

export function* createTask({ payload, navigate }: CreateTaskAction) {
    if (
        isBeginDateBiggerThanOtherDates(
            payload.beginDate,
            payload.endDate,
            payload.deliveryDate
        )
    ) {
        yield put({
            type: CreateTaskActionTypes.CREATE_TASK_FAILURE,
            payload: {},
        })
        return
    }

    const users: CreateUser[] = yield select(
        (state: InitialState) => state.users
    )

    const owner = users.find(({ email }) => email === payload.owner)

    if (!owner) {
        yield registerUser({ payload, navigate })
        return
    }

    const hasTaskWithDateConflict: CreateTask | undefined =
        yield hasSomeTaskWithDateConflict(owner, payload)

    if (hasTaskWithDateConflict) {
        yield put({
            type: CreateTaskActionTypes.CREATE_TASK_FAILURE,
            payload: {},
        })
        return
    }

    yield put({
        type: CreateTaskActionTypes.CREATE_TASK_SUCCESS,
        payload: new Task({
            ...payload,
            id: uuid.v4().toString(),
            ownerName: owner.name,
        }),
    })
    return navigate('/')
}

const isBeginDateBiggerThanOtherDates = (
    beginDate: string,
    endDate: string,
    deliveryDate: string
) => {
    return (
        isBefore(new Date(endDate), new Date(beginDate)) ||
        isBefore(new Date(deliveryDate), new Date(beginDate))
    )
}

export function* watchCreateTask() {
    yield takeLatest(CreateTaskActionTypes.CREATE_TASK, createTask)
}
