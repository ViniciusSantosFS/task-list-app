import { AnyAction } from 'redux-saga'
import { InitialState } from '../types'

export const setCreateTaskSuccess = (
    state: InitialState,
    action: AnyAction
) => ({
    ...state,
    tasks: [...state.tasks, action.payload],
})
