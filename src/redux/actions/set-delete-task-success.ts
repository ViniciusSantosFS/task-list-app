import { AnyAction } from 'redux-saga'
import { InitialState } from '../types'

export const setDeleteTaskSuccess = (
    state: InitialState,
    action: AnyAction
) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.id !== action.payload),
})
