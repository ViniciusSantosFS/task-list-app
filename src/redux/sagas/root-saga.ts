import { fork } from 'redux-saga/effects'
import { watchCreateTask } from './create-task/watch-create-task'

export function* rootSaga() {
    yield fork(watchCreateTask)
}
