import React from 'react'
import { Box, Button, TextField } from '@mui/material'
import {
    FilterTitle,
    FilterDateContainer,
    ClearFilterContainer,
} from './filter-date-header.styles'
import { Controller } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { DateForm } from 'src/pages/tasks/types'

interface Props {
    onSubmit: (data: DateForm) => void
    clearFilter: () => void
}

const FilterDateHeader = ({ onSubmit, clearFilter }: Props) => {
    const { t } = useTranslation()
    const { control, handleSubmit } = useForm()

    return (
        <FilterDateContainer
            component="form"
            onSubmit={handleSubmit((data) => onSubmit(data as DateForm))}
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
                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                    {t('filter')}
                </Button>

                <ClearFilterContainer variant="text" onClick={clearFilter}>
                    {t('clearFilter')}
                </ClearFilterContainer>
            </Box>
        </FilterDateContainer>
    )
}

export default FilterDateHeader
