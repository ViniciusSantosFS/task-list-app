import React from 'react'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MenuItem } from '@mui/material'
import { taskSchema } from './schema'
import { FormContainer, Input } from './task-form.styles'
import HelperText from '../helper-text'
import { CreateTask } from 'src/dto/create-task'
import { Task } from 'src/entity/task'

interface Props {
    task?: Task
    onSubmit: (task: CreateTask) => void
}

const TaskForm = ({ task, onSubmit }: Props) => {
    const { t } = useTranslation()
    const translate = (key: string) => t(`taskForm.${key}`)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(
            taskSchema({
                requiredField: translate('requiredField'),
                isWeekendError: translate('isWeekendError'),
                invalidEmail: translate('invalidEmail'),
            })
        ),
    })

    return (
        <>
            <FormContainer
                component="form"
                onSubmit={handleSubmit((data: unknown) =>
                    onSubmit(data as CreateTask)
                )}
            >
                <Controller
                    name="title"
                    control={control}
                    defaultValue={task?.title ?? ''}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('title')}
                            variant="outlined"
                            error={!!errors.title}
                            helperText={
                                <HelperText message={errors.title?.message} />
                            }
                        />
                    )}
                />
                <Controller
                    name="type"
                    control={control}
                    defaultValue={task?.type ?? ''}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('type')}
                            variant="outlined"
                            select
                            error={!!errors.type}
                            helperText={
                                <HelperText message={errors.type?.message} />
                            }
                        >
                            <MenuItem value="Feature">Feature</MenuItem>
                            <MenuItem value="Bug">Bug</MenuItem>
                            <MenuItem value="Task">Documentation</MenuItem>
                            <MenuItem value="Task">Question</MenuItem>
                        </Input>
                    )}
                />
                <Controller
                    name="owner"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('ownerEmail')}
                            variant="outlined"
                            error={!!errors.owner}
                            helperText={
                                <HelperText message={errors.owner?.message} />
                            }
                        />
                    )}
                />
                <Controller
                    name="description"
                    control={control}
                    defaultValue={task?.description ?? ''}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('description')}
                            variant="outlined"
                            multiline
                            rows={4}
                            error={!!errors.description}
                            helperText={
                                <HelperText
                                    message={errors.description?.message}
                                />
                            }
                        />
                    )}
                />
                <Controller
                    name="beginDate"
                    control={control}
                    defaultValue={task?.beginDate ?? ''}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('beginDate')}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.beginDate}
                            helperText={
                                <HelperText
                                    message={errors.beginDate?.message}
                                />
                            }
                        />
                    )}
                />
                <Controller
                    name="endDate"
                    control={control}
                    defaultValue={task?.endDate ?? ''}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('endDate')}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.endDate}
                            helperText={
                                <HelperText message={errors.endDate?.message} />
                            }
                        />
                    )}
                />
                <Controller
                    name="deliveryDate"
                    control={control}
                    defaultValue={task?.deliveryDate ?? ''}
                    render={({ field }) => (
                        <Input
                            {...field}
                            label={translate('deliveryDate')}
                            variant="outlined"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.deliveryDate}
                            helperText={
                                <HelperText
                                    message={errors.deliveryDate?.message}
                                />
                            }
                        />
                    )}
                />
                <Button type="submit" variant="contained" color="primary">
                    {translate('submit')}
                </Button>
            </FormContainer>
        </>
    )
}

export default TaskForm
