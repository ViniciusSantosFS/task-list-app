import { delay, put, takeLatest } from 'redux-saga/effects'
import { ApplicationError } from 'src/errors/application-error'
import { SetApplicationErrorActionTypes } from './action-types'

interface CreateUserAction {
    type: string
    payload: ApplicationError
}

const TWO_SECOND = 2000

export function* setApplicationError({ payload }: CreateUserAction) {
    yield put({
        type: SetApplicationErrorActionTypes.SET_APPLICATION_ERROR_SUCCESS,
        payload: payload,
    })

    yield delay(TWO_SECOND)

    yield put({
        type: SetApplicationErrorActionTypes.SET_APPLICATION_ERROR_SUCCESS,
        payload: null,
    })
}

export function* watchSetApplicationError() {
    yield takeLatest(
        SetApplicationErrorActionTypes.SET_APPLICATION_ERROR,
        setApplicationError
    )
}
