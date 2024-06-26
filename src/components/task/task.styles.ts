import { styled } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1px;
    border-bottom: 1px solid ${({ theme }) => theme.palette.primary.main};
`

export const Title = styled(Typography)<{ checked: boolean }>`
    text-decoration: ${({ checked }) => (checked ? 'line-through' : 'none')};
    color: ${({ checked }) => (checked ? 'gray' : 'black')};
`
export const Description = styled(Title)`
    color: ${({ theme }) => theme.palette.primary.main};
    margin-bottom: 5px;
`
