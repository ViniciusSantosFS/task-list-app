import { Box, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const Container = styled(Box)`
    flex: 1;
    flex-direction: column;
`

export const Title = styled(Typography)`
    text-align: center;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    flex-grow: 1;
`

export const FilterTitle = styled(Title)`
    text-align: start;
    color: ${({ theme }) => theme.palette.primary.main};
    font-weight: bold;
    flex-grow: 1;
    margin-bottom: 8px;
`

export const FilterDateContainer = styled(Box)`
    width: 100%;
`
