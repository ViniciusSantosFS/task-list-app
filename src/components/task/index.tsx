import React, { useState } from 'react'
import { Box, Checkbox, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Container, Description, Title } from './task.styles'
import { Task as EntityTask } from 'src/entity/task'
import { useTranslation } from 'react-i18next'

interface Props {
    task: EntityTask
    onChangeCheckBox: () => void
    onClickEdit: () => void
    onClickDelete: () => void
}

const Task = ({ task, onClickEdit, onClickDelete }: Props) => {
    const { t } = useTranslation()
    const [checked, setChecked] = useState(false)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked)
    }

    return (
        <Container>
            <Checkbox
                color="primary"
                onChange={onChange}
                value={checked}
                sx={{ marginRight: 4 }}
            />
            <Box flex={1}>
                <Title variant="h6" flexGrow={1} checked={checked}>
                    {task.title}
                </Title>
                <Description checked={checked}>
                    {task.ownerName} / {task.beginDate} - {task.endDate}
                </Description>
                <Description checked={checked}>
                    {t('delivery')}: {task.deliveryDate}
                </Description>
                <Description checked={checked}>{task.description}</Description>
            </Box>
            <Box
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <IconButton size="small" color="default" onClick={onClickEdit}>
                    <EditIcon />
                </IconButton>
                <IconButton
                    size="small"
                    color="default"
                    onClick={onClickDelete}
                >
                    <DeleteIcon />
                </IconButton>
                <Description checked={false} marginTop={6} textAlign="center">
                    {task.type}
                </Description>
            </Box>
        </Container>
    )
}

export default Task
