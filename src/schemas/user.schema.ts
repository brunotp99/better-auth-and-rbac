import * as z from 'zod'

export const getOneUserSchema = z.object({
    params: z.object({
        userId: z
            .string({
                required_error: 'Please, provide a user id.',
            })
    }),
})

export type GetOneUserInput = z.TypeOf<typeof getOneUserSchema>['params']