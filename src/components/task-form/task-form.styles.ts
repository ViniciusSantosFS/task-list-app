import { styled } from '@mui/material/styles'
import { Box, TextField } from '@mui/material'

export const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 2;
    max-width: 400px;
    margin: auto;
    margin-top: 4px;
`
export const Input = styled(TextField)`
    margin: 10px;
`
