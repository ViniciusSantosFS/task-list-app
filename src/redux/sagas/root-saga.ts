import { fork } from 'redux-saga/effects'
import { watchCreateTask } from './create-task/watch-create-task'
import { watchCreateUser } from './create-user/watch-create-user'
import { watchUpdateTask } from './update-task/watch-update-task'
import { watchSetApplicationError } from './set-application-error/watch-set-application-error'
import { watchGetRandomTodoList } from './get-random-todo-list/watch-get-random-todo-list'

export function* rootSaga() {
    yield fork(watchCreateTask)
    yield fork(watchCreateUser)
    yield fork(watchUpdateTask)
    yield fork(watchSetApplicationError)
    yield fork(watchGetRandomTodoList)
}
