import React from 'react'
import RegisterTaskHeader from 'src/components/register-task-header'
import { CreateTaskActionTypes } from 'src/redux/sagas/create-task/action-types'
import TaskForm from 'src/components/task-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CreateTask } from 'src/dto/create-task'
import ErrorAlert from 'src/components/error-alert'
import { useTranslation } from 'react-i18next'

function RegisterTask() {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data: CreateTask) => {
        const task = new CreateTask(
            data.title,
            data.type,
            data.owner,
            data.description,
            data.beginDate,
            data.endDate,
            data.deliveryDate
        )

        dispatch({
            type: CreateTaskActionTypes.CREATE_TASK,
            payload: task,
            navigate,
        })
    }
    return (
        <>
            <ErrorAlert />
            <RegisterTaskHeader title={t('taskForm.register')} />
            <TaskForm
                onSubmit={onSubmit}
                submitButtonTitle={t('taskForm.submit')}
            />
        </>
    )
}

export default RegisterTask
