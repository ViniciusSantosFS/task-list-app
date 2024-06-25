import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, MenuItem, Typography } from '@mui/material'
import { taskSchema } from './schema'
import { FormContainer, Input } from './task-form.styles'
import HelperText from '../helper-text'

const TaskForm = () => {
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
            })
        ),
    })

    const onSubmit = (data: unknown) => {
        console.log(data)
        // Handle form submission
    }

    return (
        <FormContainer component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5" gutterBottom>
                {translate('register')}
            </Typography>
            <Controller
                name="title"
                control={control}
                defaultValue=""
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
                defaultValue=""
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
                        <MenuItem value="Task">Task</MenuItem>
                        <MenuItem value="Bug">Bug</MenuItem>
                        <MenuItem value="Feature">Feature</MenuItem>
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
                        label={translate('owner')}
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
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label={translate('description')}
                        variant="outlined"
                        multiline
                        rows={4}
                        error={!!errors.description}
                        helperText={
                            <HelperText message={errors.description?.message} />
                        }
                    />
                )}
            />
            <Controller
                name="beginDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label={translate('beginDate')}
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.beginDate}
                        helperText={
                            <HelperText message={errors.beginDate?.message} />
                        }
                    />
                )}
            />
            <Controller
                name="finishDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <Input
                        {...field}
                        label={translate('endDate')}
                        variant="outlined"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.finishDate}
                        helperText={
                            <HelperText message={errors.finishDate?.message} />
                        }
                    />
                )}
            />
            <Controller
                name="deliveryDate"
                control={control}
                defaultValue=""
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
                {t('taskForm.submit')}
            </Button>
        </FormContainer>
    )
}

export default TaskForm
