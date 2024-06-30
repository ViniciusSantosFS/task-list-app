import { AnyAction } from 'redux-saga'
import { InitialState } from './types'
import updateState from './update-state'

const initialState: InitialState = {
    tasks: [],
    users: [],
    error: null,
}

const rootReducer = (state = initialState, action: AnyAction) =>
    updateState(state, action)

export { rootReducer }
