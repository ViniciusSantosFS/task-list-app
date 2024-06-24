import { applyMiddleware, legacy_createStore } from 'redux'
import { rootReducer } from './root-reducer'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/root-saga'

export default () => {
    const sagaMiddleware = createSagaMiddleware({})

    const store = legacy_createStore(
        rootReducer,
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)

    return store
}
