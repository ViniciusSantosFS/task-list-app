import { AnyAction } from 'redux-saga'
import { InitialState } from './types'
import { CreateTaskActionTypes } from './sagas/create-task/action-types'

const initialState: InitialState = {
    tasks: [],
}

const rootReducer = (state = initialState, action: AnyAction) => {
    if (action.type === CreateTaskActionTypes.CREATE_TASK_SUCCESS) {
        return {
            ...state,
            tasks: state.tasks.concat(action.payload),
        }
    }

    return state
}

export { rootReducer }
