import { applyMiddleware, legacy_createStore } from 'redux'
import { rootReducer } from './root-reducer'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './sagas/root-saga'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

export default () => {
    const sagaMiddleware = createSagaMiddleware({})
    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = legacy_createStore(
        persistedReducer,
        applyMiddleware(sagaMiddleware)
    )

    sagaMiddleware.run(rootSaga)
    const persistor = persistStore(store)

    return { store, persistor }
}
