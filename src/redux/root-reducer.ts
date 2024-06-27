import { AnyAction } from 'redux-saga'
import { InitialState } from './types'
import { CreateTaskActionTypes } from './sagas/create-task/action-types'
import { CreateUserActionTypes } from './sagas/create-user/action-types'
import { UpdateTaskActionTypes } from './sagas/update-task/action-types'

const initialState: InitialState = {
    tasks: [],
    users: [],
}

const rootReducer = (state = initialState, action: AnyAction) => {
    if (action.type === CreateTaskActionTypes.CREATE_TASK_SUCCESS) {
        return {
            ...state,
            tasks: [...state.tasks, action.payload],
        }
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
