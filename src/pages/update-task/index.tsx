import React from 'react'
import TaskForm from 'src/components/task-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { CreateTask } from 'src/dto/create-task'
import { InitialState } from 'src/redux/types'
import { UpdateTaskActionTypes } from 'src/redux/sagas/update-task/action-types'
import { Task } from 'src/entity/task'
import ErrorAlert from 'src/components/error-alert'

function UpdateTask() {
    const { id } = useParams()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const tasks = useSelector((state: InitialState) => state.tasks)
    const users = useSelector((state: InitialState) => state.users)

    const findTaskById = () => tasks.find((task) => task.id === id)

    const onSubmit = (task: CreateTask) => {
        if (!id) return

        const owner = users.find((user) => user.email === task.owner)
        if (!owner) return

        const taskEntity = new Task({ ...task, id, ownerName: owner.name })
        dispatch({
            type: UpdateTaskActionTypes.UPDATE_TASK,
            payload: taskEntity,
        })
        navigate('/')
    }

    return (
        <>
            <ErrorAlert />
            <TaskForm onSubmit={onSubmit} task={findTaskById()} />
        </>
    )
}

export default UpdateTask
