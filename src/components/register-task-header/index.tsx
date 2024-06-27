import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { FormHeaderContainer, Title } from './register-task-header.styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import React, { useState } from 'react'
import RegisterUserModal from '../register-owner-modal'
import { CreateUser } from 'src/dto/create-user'
import { CreateUserActionTypes } from 'src/redux/sagas/create-user/action-types'
import { useNavigate } from 'react-router-dom'

const RegisterTaskHeader = () => {
    const { t } = useTranslation()
    const translate = (key: string) => t(`taskForm.${key}`)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const onRegisterUser = (data: CreateUser) => {
        const user = new CreateUser(data.name, data.email)
        dispatch({ type: CreateUserActionTypes.CREATE_USER, payload: user })
        setIsModalOpen(false)
    }
    return (
        <>
            <RegisterUserModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={onRegisterUser}
            />
            <FormHeaderContainer>
                <Button onClick={() => navigate('/')}>
                    <ArrowBackIcon color={'primary'} fontWeight="bold" />
                </Button>
                <Title variant="h5" color={'primary'}>
                    {translate('register')}
                </Title>
                <Button onClick={() => setIsModalOpen(true)}>
                    <AddIcon />
                </Button>
            </FormHeaderContainer>
        </>
    )
}

export default RegisterTaskHeader
