import { Box, Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

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
    align-items: center;
    justify-content: center;
`

export const ClearFilterContainer = styled(Button)`
    margin-top: 24px;
    margin-left: 22px;

    @media (max-width: 600px), (max-width: 960px) {
        margin-top: 10px;
        margin-left: 0;
    }
`
