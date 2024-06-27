import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AddButton from 'src/components/add-button'
import Task from 'src/components/task'
import { Task as EntityTask } from 'src/entity/task'
import { InitialState } from 'src/redux/types'
import { Box, TextField, Toolbar } from '@mui/material'
import {
    Title,
    FilterTitle,
    Container,
    FilterDateContainer,
} from './tasks.styles'
import { UpdateTaskActionTypes } from 'src/redux/sagas/update-task/action-types'

function Tasks() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const tasks = useSelector((state: InitialState) => state.tasks)

    const onChangeCheckBox = (task: EntityTask, checked: boolean) => {
        dispatch({
            type: UpdateTaskActionTypes.UPDATE_TASK,
            payload: { ...task, done: checked },
        })
    }

    const onClickEdit = (taskId: string) => {
        navigate(`/tasks/update/${taskId}`)
    }

    const onClickDelete = (taskId: string) => {
        dispatch({
            type: UpdateTaskActionTypes.DELETE_TASK,
            payload: taskId,
        })
    }

    const TaskList = () => {
        return tasks.map((task) => (
            <Task
                task={task}
                onChangeCheckBox={(checked) => onChangeCheckBox(task, checked)}
                onClickEdit={() => onClickEdit(task.id)}
                onClickDelete={() => onClickDelete(task.id)}
            />
        ))
    }

    return (
        <Container>
            <Title variant="h6" noWrap>
                {t('tasksTitle')}
            </Title>
            <Toolbar sx={{ marginTop: 2 }}>
                <FilterDateContainer>
                    <FilterTitle>{t('filterByDate')}</FilterTitle>
                    <TextField
                        label={t('taskForm.beginDate')}
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        sx={{ marginRight: 2 }}
                    />

                    <TextField
                        label={t('taskForm.endDate')}
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                    />
                </FilterDateContainer>

                <AddButton
                    title={t('addbutton')}
                    onClick={() => navigate('/tasks/register')}
                    sx={{ minWidth: 200, marginTop: 4 }}
                />
            </Toolbar>

            <Box sx={{ marginTop: 6 }}>
                <TaskList />
            </Box>
        </Container>
    )
}

export default Tasks
