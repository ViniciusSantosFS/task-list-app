import 'src/i18n'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App'
import { Provider } from 'react-redux'
import createStore from 'src/redux/store'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'src/themes'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = createStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
)
