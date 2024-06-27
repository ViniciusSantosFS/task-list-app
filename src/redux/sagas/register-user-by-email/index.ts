import uuid from 'react-native-uuid'
import { put } from 'redux-saga/effects'
import { CreateUser } from 'src/dto/create-user'
import { Task } from 'src/entity/task'
import { CreateUserActionTypes } from '../create-user/action-types'
import { CreateTaskActionTypes } from '../create-task/action-types'
import { CreateTaskAction } from '../create-task/types'

export function* registerUser({
    payload,
    navigate,
}: Omit<CreateTaskAction, 'type'>) {
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
            ownerEmail: user.email,
        }),
    })

    return navigate('/')
}
