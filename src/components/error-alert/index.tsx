import React from 'react'
import { useSelector } from 'react-redux'
import { InitialState } from 'src/redux/types'
import { Alert } from '@mui/material'

const ErrorAlert = () => {
    const error = useSelector((state: InitialState) => state.error)

    return error !== null ? (
        <Alert variant="outlined" severity="error">
            {error.message}
        </Alert>
    ) : (
        <></>
    )
}

export default ErrorAlert
