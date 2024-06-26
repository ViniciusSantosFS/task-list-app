import { AnyAction } from 'redux-saga'
import { InitialState } from './types'
import { CreateTaskActionTypes } from './sagas/create-task/action-types'
import { CreateUserActionTypes } from './sagas/create-user/action-types'

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

    return state
}

export { rootReducer }
