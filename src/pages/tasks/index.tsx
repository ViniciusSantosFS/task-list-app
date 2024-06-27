import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AddButton from 'src/components/add-button'
import Task from 'src/components/task'
import { Task as EntityTask } from 'src/entity/task'
import { InitialState } from 'src/redux/types'
import { Box, Toolbar } from '@mui/material'
import { Title, Container } from './tasks.styles'
import { UpdateTaskActionTypes } from 'src/redux/sagas/update-task/action-types'
import { isAfter, isBefore } from 'date-fns'
import FilterDateHeader from 'src/components/filter-date-header'
import { DateForm } from './types'

function Tasks() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const tasks = useSelector((state: InitialState) => state.tasks)
    const [localTasks, setLocalTasks] = useState<EntityTask[]>(tasks)

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

    const onSubmit = (data: DateForm) => {
        const beginDate = new Date(data.beginDate)
        const endDate = new Date(data.endDate)

        const filteredTasks = localTasks.filter(
            (task) =>
                isAfter(new Date(task.beginDate), beginDate) &&
                isBefore(new Date(task.endDate), endDate)
        )

        setLocalTasks(filteredTasks)
    }

    const TaskList = () => {
        return localTasks.map((task) => (
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
                <FilterDateHeader
                    onSubmit={onSubmit}
                    clearFilter={() => setLocalTasks(tasks)}
                />

                <AddButton
                    title={t('addbutton')}
                    onClick={() => navigate('/tasks/register')}
                    sx={{ minWidth: 200 }}
                />
            </Toolbar>

            <Box sx={{ marginTop: 6 }}>
                <TaskList />
            </Box>
        </Container>
    )
}

export default Tasks
