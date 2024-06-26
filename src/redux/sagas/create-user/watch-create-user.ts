import { put, select, takeLatest } from 'redux-saga/effects'
import { CreateUser } from 'src/dto/create-user'
import { CreateUserActionTypes } from './action-types'
import { InitialState } from 'src/redux/types'

interface CreateUserAction {
    type: string
    payload: CreateUser
}

export function* createUser({ payload }: CreateUserAction) {
    try {
        const users: CreateUser[] = yield select(
            (state: InitialState) => state.users
        )

        const isEmailAlreadyRegistered = users.some(
            (user) => user.email === payload.email
        )

        if (isEmailAlreadyRegistered) {
            yield put({
                type: CreateUserActionTypes.CREATE_USER_FAILURE,
                payload: {},
            })
            return
        }

        yield put({ type: CreateUserActionTypes.CREATE_USER_SUCCESS, payload })
    } catch (error) {
        yield put({
            type: CreateUserActionTypes.CREATE_USER_FAILURE,
            payload: { error: 'DEU ERRO' },
        })
    }
}

export function* watchCreateUser() {
    yield takeLatest(CreateUserActionTypes.CREATE_USER, createUser)
}
