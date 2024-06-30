import { AnyAction } from 'redux-saga'
import { InitialState } from '../types'

export const setError = (state: InitialState, action: AnyAction) => ({
    ...state,
    error: action.payload,
})
