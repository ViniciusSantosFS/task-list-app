import { put, select, takeLatest } from 'redux-saga/effects'
import { CreateUser } from 'src/dto/create-user'
import { CreateUserActionTypes } from './action-types'
import { InitialState } from 'src/redux/types'
import { ApplicationError } from 'src/errors/application-error'
import { SetApplicationErrorActionTypes } from '../set-application-error/action-types'

interface CreateUserAction {
    type: string
    payload: CreateUser
}

export function* createUser({ payload }: CreateUserAction) {
    const users: CreateUser[] = yield select(
        (state: InitialState) => state.users
    )

    const isEmailAlreadyRegistered = users.some(
        (user) => user.email === payload.email
    )

    if (isEmailAlreadyRegistered) {
        yield put({
            type: SetApplicationErrorActionTypes.SET_APPLICATION_ERROR,
            payload: new ApplicationError(
                'createUser.errors.emailAlreadyRegistered'
            ),
        })
        return
    }

    yield put({ type: CreateUserActionTypes.CREATE_USER_SUCCESS, payload })
}

export function* watchCreateUser() {
    yield takeLatest(CreateUserActionTypes.CREATE_USER, createUser)
}
