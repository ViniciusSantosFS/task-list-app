import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AddButton from 'src/components/add-button'
import Task from 'src/components/task'
import { Task as EntityTask } from 'src/entity/task'
import { InitialState } from 'src/redux/types'
import { Box, Button, TextField, Toolbar } from '@mui/material'
import {
    Title,
    FilterTitle,
    Container,
    FilterDateContainer,
} from './tasks.styles'
import { UpdateTaskActionTypes } from 'src/redux/sagas/update-task/action-types'
import { Controller, useForm } from 'react-hook-form'
import { isAfter, isBefore } from 'date-fns'

function Tasks() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const tasks = useSelector((state: InitialState) => state.tasks)
    const [localTasks, setLocalTasks] = useState<EntityTask[]>(tasks)

    const { control, handleSubmit } = useForm()

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

    interface DateForm {
        beginDate: string
        endDate: string
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
                <FilterDateContainer
                    component="form"
                    onSubmit={handleSubmit((data) =>
                        onSubmit(data as DateForm)
                    )}
                >
                    <FilterTitle>{t('filterByDate')}</FilterTitle>

                    <Controller
                        name="beginDate"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t('taskForm.beginDate')}
                                variant="outlined"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginRight: 2 }}
                            />
                        )}
                    />

                    <Controller
                        name="endDate"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label={t('taskForm.endDate')}
                                variant="outlined"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                sx={{ marginRight: 2 }}
                            />
                        )}
                    />

                    <Box>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{ mt: 2 }}
                        >
                            {t('filter')}
                        </Button>

                        <Button
                            variant="text"
                            sx={{ mt: 2, ml: 14 }}
                            onClick={() => setLocalTasks(tasks)}
                        >
                            {t('clearFilter')}
                        </Button>
                    </Box>
                </FilterDateContainer>

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
