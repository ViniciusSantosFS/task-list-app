import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalProps } from '@mui/material'
import { registerOwnerSchema } from './schema'
import HelperText from '../helper-text'
import {
    Input,
    ModalContainer,
    Title,
    SubmitButton,
    HeaderContainer,
} from './register-owner-modal.styles'
import { CreateUser } from 'src/dto/create-user'

interface Props extends Omit<ModalProps, 'children' | 'onSubmit'> {
    onSubmit: (data: CreateUser) => void
}

const RegisterUserModal = ({ onSubmit, ...rest }: Props) => {
    const { t } = useTranslation()
    const translate = (key: string) => t(`taskForm.${key}`)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(
            registerOwnerSchema({
                requiredField: translate('requiredField'),
                invalidEmail: translate('invalidEmail'),
            })
        ),
    })

    return (
        <Modal {...rest}>
            <ModalContainer
                component="form"
                onSubmit={handleSubmit((data: unknown) =>
                    onSubmit(data as CreateUser)
                )}
            >
                <HeaderContainer>
                    <Title variant="h5" color={'primary'}>
                        {translate('registerUser')}
                    </Title>
                </HeaderContainer>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('name')}
                            variant="outlined"
                            multiline
                            error={!!errors.name}
                            helperText={
                                <HelperText message={errors.name?.message} />
                            }
                        />
                    )}
                />

                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('email')}
                            variant="outlined"
                            error={!!errors.email}
                            helperText={
                                <HelperText message={errors.email?.message} />
                            }
                        />
                    )}
                />

                <SubmitButton type="submit" variant="contained" color="primary">
                    {translate('submit')}
                </SubmitButton>
            </ModalContainer>
        </Modal>
    )
}

export default RegisterUserModal
