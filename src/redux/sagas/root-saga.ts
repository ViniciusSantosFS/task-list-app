import { fork } from 'redux-saga/effects'
import { watchCreateTask } from './create-task/watch-create-task'
import { watchCreateUser } from './create-user/watch-create-user'

export function* rootSaga() {
    yield fork(watchCreateTask)
    yield fork(watchCreateUser)
}
