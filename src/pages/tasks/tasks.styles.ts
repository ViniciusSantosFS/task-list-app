import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)`
    flex: 1;
    flex-direction: column;
`

export const Title = styled(Typography)`
    margin-top: 10px;
    text-align: center;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    flex-grow: 1;
`

export const PaginationButtonsContainer = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
