import { put, takeLatest } from 'redux-saga/effects'
import { CreateUser } from 'src/dto/create-user'
import { CreateUserActionTypes } from './action-types'

interface CreateUserAction {
    type: string
    payload: CreateUser
}

export function* createUser({ payload }: CreateUserAction) {
    try {
        // Cadastrar um usuário com nome e email no estado
        yield put({ type: CreateUserActionTypes.CREATE_USER_SUCCESS, payload })
    } catch (error) {
        console.log('ERROR', error)
    }
}

export function* watchCreateUser() {
    yield takeLatest(CreateUserActionTypes.CREATE_USER, createUser)
}
