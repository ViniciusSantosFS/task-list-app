import { AnyAction } from 'redux-saga'
import { InitialState } from '../types'

export const setGetRandomTodoListSuccess = (
    state: InitialState,
    action: AnyAction
) => {
    if (!Array.isArray(action.payload)) return state

    return {
        ...state,
        tasks: [...state.tasks, ...action.payload],
    }
}
