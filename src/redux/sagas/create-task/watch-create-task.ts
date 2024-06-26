import uuid from 'react-native-uuid'
import { put, select, takeLatest } from 'redux-saga/effects'
import { CreateTask } from 'src/dto/create-task'
import { isBefore } from 'date-fns'
import { CreateTaskActionTypes } from './action-types'
import { InitialState } from 'src/redux/types'
import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'

interface CreateTaskAction {
    type: string
    payload: CreateTask
}

const isBeginDateBiggerThanOtherDates = (
    beginDate: Date,
    endDate: Date,
    deliveryDate: Date
) => {
    return isBefore(endDate, beginDate) || isBefore(deliveryDate, beginDate)
}

export function* createTask({ payload }: CreateTaskAction) {
    try {
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

        const user = users.find(({ email }) => email === payload.owner)

        if (!user) {
            yield put({
                type: CreateTaskActionTypes.CREATE_TASK_FAILURE,
                payload: {},
            })
            return
        }

        const tasks: CreateTask[] = yield select(
            (state: InitialState) => state.tasks
        )

        const usersTask = tasks.filter((task) => task.owner === user.email)

        const hasTaskWithDateConflict = usersTask.find((task) => {
            return (
                task.beginDate === payload.beginDate ||
                task.endDate === payload.endDate ||
                task.deliveryDate === payload.deliveryDate
            )
        })

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
                ownerName: user.name,
            }),
        })
    } catch (error) {
        console.log('ERROR', error)
    }
}

export function* watchCreateTask() {
    yield takeLatest(CreateTaskActionTypes.CREATE_TASK, createTask)
}
