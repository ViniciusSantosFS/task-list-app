import 'src/i18n'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App.tsx'
import { Provider } from 'react-redux'
import createStore from 'src/redux/store.ts'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from 'src/themes'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={createStore()}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
)
