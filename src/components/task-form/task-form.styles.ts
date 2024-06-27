import { styled } from '@mui/material/styles'
import { Box, TextField } from '@mui/material'

export const FormContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 2;
    margin: auto;
    margin-top: 6px;
`
export const Input = styled(TextField)`
    margin: 10px;
`
