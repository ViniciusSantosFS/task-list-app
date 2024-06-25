import { z } from 'zod'
import { parseISO, isWeekend } from 'date-fns'

interface Messages {
    requiredField: string
    isWeekendError: string
}

const isWeekday = (dateString: string) => {
    const date = parseISO(dateString)
    return !isWeekend(date)
}

export const taskSchema = ({ requiredField, isWeekendError }: Messages) =>
    z.object({
        title: z.string().min(1, requiredField),
        type: z.string().min(1, requiredField),
        owner: z.string().min(1, requiredField),
        description: z.string().optional(),
        beginDate: z.string().min(1, requiredField).refine(isWeekday, {
            message: isWeekendError,
        }),
        endDate: z.string().min(1, requiredField).refine(isWeekday, {
            message: isWeekendError,
        }),
        deliveryDate: z.string().min(1, requiredField).refine(isWeekday, {
            message: isWeekendError,
        }),
    })
