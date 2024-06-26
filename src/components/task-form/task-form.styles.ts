import { styled } from '@mui/material/styles'
import { Box, TextField, Typography } from '@mui/material'

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

export const FormHeaderContainer = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
`

export const Title = styled(Typography)`
    flex: 1;
    font-weight: bold;
    text-align: center;
`
