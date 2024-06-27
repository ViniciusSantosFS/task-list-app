import { fork } from 'redux-saga/effects'
import { watchCreateTask } from './create-task/watch-create-task'
import { watchCreateUser } from './create-user/watch-create-user'
import { watchUpdateTask } from './update-task/watch-update-task'

export function* rootSaga() {
    yield fork(watchCreateTask)
    yield fork(watchCreateUser)
    yield fork(watchUpdateTask)
}
