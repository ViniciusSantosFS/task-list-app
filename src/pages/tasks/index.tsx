import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AddButton from 'src/components/add-button'
import Task from 'src/components/task'
import { InitialState } from 'src/redux/types'
import { Box, TextField, Toolbar } from '@mui/material'
import {
    Title,
    FilterTitle,
    Container,
    FilterDateContainer,
} from './tasks.styles'

function Tasks() {
    const { t } = useTranslation()
    const navigate = useNavigate()

    const tasks = useSelector((state: InitialState) => state.tasks)

    const TaskList = () => {
        return tasks.map((task) => (
            <Task
                task={task}
                onChangeCheckBox={() => {}}
                onClickEdit={() => {}}
                onClickDelete={() => {}}
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
