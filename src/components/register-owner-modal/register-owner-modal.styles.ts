import { styled } from '@mui/material/styles'
import { Box, Button, TextField, Typography } from '@mui/material'

export const ModalContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: 2em 20rem;
    padding: 10em 10em;
    padding-top: 2em;
    background-color: ${({ theme }) => theme.palette.background.paper};
    border-radius: 2%;

    @media (max-width: 1000px) {
        margin: 2em 2em;
        padding: 5em 2em;
    }

    @media (max-width: 480px) {
        margin: 2em 1em;
        padding: 3em 1em;
    }
`

export const HeaderContainer = styled(Box)`
    display: flex;
    justify-content: center;
`

export const Input = styled(TextField)`
    margin: 10px;
`

export const SubmitButton = styled(Button)`
    margin-top: 2em;
`

export const Title = styled(Typography)`
    flex: 1;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2em;
`
