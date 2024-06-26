import { z } from 'zod'

interface Messages {
    requiredField: string
    invalidEmail: string
}

export const registerOwnerSchema = ({
    requiredField,
    invalidEmail,
}: Messages) =>
    z.object({
        name: z.string().min(1, requiredField),
        email: z.string().min(1, requiredField).email(invalidEmail),
    })
