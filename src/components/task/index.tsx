import React from 'react'
import { Box, Checkbox, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { Container, Description, Title } from './task.styles'
import { Task as EntityTask } from 'src/entity/task'
import { useTranslation } from 'react-i18next'

interface Props {
    task: EntityTask
    onChangeCheckBox: (checked: boolean) => void
    onClickEdit: () => void
    onClickDelete: () => void
}

const Task = ({
    task,
    onChangeCheckBox,
    onClickEdit,
    onClickDelete,
}: Props) => {
    const { t } = useTranslation()

    const onChange = () => {
        onChangeCheckBox(!task.done)
    }

    return (
        <Container>
            <Checkbox
                color="primary"
                onChange={onChange}
                checked={task.done}
                sx={{ marginRight: 4 }}
            />
            <Box flex={1}>
                <Title variant="h6" flexGrow={1} checked={task.done}>
                    {task.title}
                </Title>
                <Description checked={task.done}>
                    {task.ownerName} / {task.beginDate} - {task.endDate}
                </Description>
                <Description checked={task.done}>
                    {t('delivery')}: {task.deliveryDate}
                </Description>
                <Description checked={task.done}>
                    {task.description}
                </Description>
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
