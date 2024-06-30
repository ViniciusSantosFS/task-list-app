import { AnyAction } from 'redux-saga'
import { InitialState } from '../types'

export const setCreateUserSuccess = (
    state: InitialState,
    action: AnyAction
) => ({
    ...state,
    users: [...state.users, action.payload],
})
