import { AnyAction } from 'redux-saga'
import { InitialState } from '../types'

export const setUpdateTaskSuccess = (
    state: InitialState,
    action: AnyAction
) => ({
    ...state,
    tasks: action.payload,
})
