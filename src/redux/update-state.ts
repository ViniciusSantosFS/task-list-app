import { AnyAction } from 'redux-saga'
import { InitialState } from './types'
import { CreateTaskActionTypes } from './sagas/create-task/action-types'
import { CreateUserActionTypes } from './sagas/create-user/action-types'
import { UpdateTaskActionTypes } from './sagas/update-task/action-types'
import { SetApplicationErrorActionTypes } from './sagas/set-application-error/action-types'
import { GetRandomTodoListActionTypes } from './sagas/get-random-todo-list/action-types'
import { setError } from './actions/set-error'
import { setDeleteTaskSuccess } from './actions/set-delete-task-success'
import { setCreateTaskSuccess } from './actions/set-create-task-success'
import { setGetRandomTodoListSuccess } from './actions/set-get-random-todo-list-success'
import { setUpdateTaskSuccess } from './actions/set-update-task-success'
import { setCreateUserSuccess } from './actions/set-create-user-success'

export default (state: InitialState, action: AnyAction) =>
    ({
        [SetApplicationErrorActionTypes.SET_APPLICATION_ERROR_SUCCESS]:
            setError(state, action),
        [CreateTaskActionTypes.CREATE_TASK_SUCCESS]: setCreateTaskSuccess(
            state,
            action
        ),
        [GetRandomTodoListActionTypes.GET_RANDOM_TODO_LIST_SUCCESS]:
            setGetRandomTodoListSuccess(state, action),
        [CreateUserActionTypes.CREATE_USER_SUCCESS]: setCreateUserSuccess(
            state,
            action
        ),
        [UpdateTaskActionTypes.UPDATE_TASK_SUCCESS]: setUpdateTaskSuccess(
            state,
            action
        ),
        [UpdateTaskActionTypes.DELETE_TASK]: setDeleteTaskSuccess(
            state,
            action
        ),
    })[action.type] ?? state
