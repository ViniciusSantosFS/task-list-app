import uuid from 'react-native-uuid'
import { put, select, takeLatest } from 'redux-saga/effects'
import { CreateTask } from 'src/dto/create-task'
import { isBefore } from 'date-fns'
import { CreateTaskActionTypes } from './action-types'
import { InitialState } from 'src/redux/types'
import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'
import { CreateUserActionTypes } from '../create-user/action-types'

interface CreateTaskAction {
    type: string
    payload: CreateTask
    navigate: (path: string) => void
}

export function* createTask({ payload, navigate }: CreateTaskAction) {
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

        const owner = users.find(({ email }) => email === payload.owner)

        if (!owner) {
            yield registerUser({ payload, navigate })
            return
        }

        const tasks: CreateTask[] = yield select(
            (state: InitialState) => state.tasks
        )

        const usersTask = tasks.filter((task) => task.owner === owner.email)

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
                ownerName: owner.name,
            }),
        })
        return navigate('/')
    } catch (error) {
        console.log('ERROR', error)
    }
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

function* registerUser({ payload, navigate }: Omit<CreateTaskAction, 'type'>) {
    const [name] = payload.owner.split('@')
    const user = new CreateUser(name, payload.owner)

    yield put({
        type: CreateUserActionTypes.CREATE_USER,
        payload: user,
    })

    yield put({
        type: CreateTaskActionTypes.CREATE_TASK_SUCCESS,
        payload: new Task({
            ...payload,
            id: uuid.v4().toString(),
            ownerName: user.name,
        }),
    })
    return navigate('/')
}

export function* watchCreateTask() {
    yield takeLatest(CreateTaskActionTypes.CREATE_TASK, createTask)
}
