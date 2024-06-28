import { AnyAction } from 'redux-saga'
import { InitialState } from './types'
import { CreateTaskActionTypes } from './sagas/create-task/action-types'
import { CreateUserActionTypes } from './sagas/create-user/action-types'
import { UpdateTaskActionTypes } from './sagas/update-task/action-types'
import { SetApplicationErrorActionTypes } from './sagas/set-application-error/action-types'
import { GetRandomTodoListActionTypes } from './sagas/get-random-todo-list/action-types'

const initialState: InitialState = {
    tasks: [],
    users: [],
    error: null,
}

const rootReducer = (state = initialState, action: AnyAction) => {
    if (
        action.type ===
        SetApplicationErrorActionTypes.SET_APPLICATION_ERROR_SUCCESS
    ) {
        return {
            ...state,
            error: action.payload,
        }
    }

    if (action.type === CreateTaskActionTypes.CREATE_TASK_SUCCESS) {
        return {
            ...state,
            tasks: [...state.tasks, action.payload],
        }
    }

    if (
        action.type ===
        GetRandomTodoListActionTypes.GET_RANDOM_TODO_LIST_SUCCESS
    ) {
        return { ...state, tasks: [...state.tasks, ...action.payload] }
    }

    if (action.type === CreateUserActionTypes.CREATE_USER_SUCCESS) {
        return {
            ...state,
            users: [...state.users, action.payload],
        }
    }

    if (action.type === UpdateTaskActionTypes.UPDATE_TASK_SUCCESS) {
        return { ...state, tasks: action.payload }
    }

    if (action.type === UpdateTaskActionTypes.DELETE_TASK) {
        return {
            ...state,
            tasks: state.tasks.filter((task) => task.id !== action.payload),
        }
    }

    return state
}

export { rootReducer }
