import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import AddButton from 'src/components/add-button'
import Task from 'src/components/task'
import { Task as EntityTask } from 'src/entity/task'
import { InitialState } from 'src/redux/types'
import { Box, Button, Toolbar } from '@mui/material'
import { Title, Container, PaginationButtonsContainer } from './tasks.styles'
import { UpdateTaskActionTypes } from 'src/redux/sagas/update-task/action-types'
import { isAfter, isBefore, isEqual, parseISO } from 'date-fns'
import FilterDateHeader from 'src/components/filter-date-header'
import { DateForm } from './types'
import { GetRandomTodoListActionTypes } from 'src/redux/sagas/get-random-todo-list/action-types'
import { TodoListService } from 'src/services/todo-list'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

function Tasks() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const itemsPerPage = 5
    const tasks = useSelector((state: InitialState) => state.tasks)
    const [localTasks, setLocalTasks] = useState<EntityTask[]>(tasks)
    const [currentPage, setCurrentPage] = useState(1)

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
        const beginDate = new Date(data.beginDate).toISOString()
        const endDate = new Date(data.endDate).toISOString()

        console.log('beginDate', beginDate)
        console.log('beginDate', endDate)

        const filteredTasks = localTasks.filter((task) => {
            const isAfterOrEqual =
                isAfter(parseISO(task.beginDate).toISOString(), beginDate) ||
                isEqual(parseISO(task.beginDate).toISOString(), beginDate)
            const isBeforeOrEqual =
                isBefore(parseISO(task.endDate).toISOString(), endDate) ||
                isEqual(parseISO(task.endDate).toISOString(), endDate)

            return isAfterOrEqual && isBeforeOrEqual
        })

        setLocalTasks(filteredTasks)
    }

    const TaskList = () => {
        const localTasksPaginated = localTasks.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        )

        return localTasksPaginated.map((task) => (
            <Task
                task={task}
                onChangeCheckBox={(checked) => onChangeCheckBox(task, checked)}
                onClickEdit={() => onClickEdit(task.id)}
                onClickDelete={() => onClickDelete(task.id)}
            />
        ))
    }

    const goToNextPage = () => {
        if (currentPage >= Math.ceil(localTasks.length / itemsPerPage)) return
        setCurrentPage(currentPage + 1)
    }

    const goToPreviousPage = () => {
        if (currentPage <= 1) return
        setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        if (tasks.length <= 20) {
            dispatch({
                type: GetRandomTodoListActionTypes.GET_RANDOM_TODO_LIST,
                payload: new TodoListService(),
            })
        }
    }, [])

    useEffect(() => {
        setLocalTasks(tasks)
    }, [tasks])

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
                <PaginationButtonsContainer>
                    <Button onClick={goToPreviousPage}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button onClick={goToNextPage}>
                        <ChevronRightIcon />
                    </Button>
                </PaginationButtonsContainer>
            </Box>
        </Container>
    )
}

export default Tasks
