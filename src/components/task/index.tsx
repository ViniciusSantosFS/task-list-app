import React, { useState } from 'react'
import { Box, Checkbox, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Container, Description, Title } from './task.styles'

interface Props {
    title: string
    description: string
    owner: string
    onChangeCheckBox: () => void
    onClickEdit: () => void
    onClickDelete: () => void
}

const Task = ({
    title,
    description,
    owner,
    onClickEdit,
    onClickDelete,
}: Props) => {
    const [checked, setChecked] = useState(false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    return (
        <Container>
            <Checkbox color="primary" onChange={onChange} value={checked} />
            <Box flex={1}>
                <Title variant="h6" flexGrow={1} checked={checked}>
                    {title}
                </Title>
                <Description checked={checked}>
                    {owner}-{description}
                </Description>
            </Box>
            <IconButton size="small" color="default" onClick={onClickEdit}>
                <EditIcon />
            </IconButton>
            <IconButton size="small" color="default" onClick={onClickDelete}>
                <DeleteIcon />
            </IconButton>
        </Container>
    )
}

export default Task
