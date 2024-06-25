import { Typography } from '@mui/material'
import React from 'react'

interface Props<Field> {
    message: Field
}

function HelperText<Field>({ message }: Props<Field>) {
    if (!message) return <></>
    return <Typography variant="body2">{message as string}</Typography>
}

export default HelperText
