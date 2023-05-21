import { z } from  'zod';


const userCore  = {
    name: z.string().min(3, 'Name must be at least 3 characters').max(255),
    email: z.string().email('Please inform a valid email address').min(1, 'Email is required')
}

export const userSchema = z.object({
    ...userCore,
    password: z.string().min(6, 'Password must be at least 6 characters').max(255),
})

export const userCreateSchema =  z
    .object({
        ...userCore,
        password: z.string().min(6, 'Password must be at least 6 characters').max(255),
        password_confirmation: z.string({ required_error: 'Campo obrigatório' }),
    })
    //validação refinada que permite adicionar validações mais complexas
    .refine(data =>data.password === data.password_confirmation, {
        message: `Password confirmation doesn't match Password`,
        path: ['password_confirmation'],
    })


export const userLoginSchema = z.object({
    email: z.string().email('Please inform a valid email address').min(1, 'Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters').max(255),
})


export const userPathParams = z.object({
    id: z.string()
})


export type UserSchema = z.infer<typeof userSchema>
export type CreateUserSchema = z.infer<typeof userCreateSchema>
export type LoginUserSchema = z.infer<typeof userLoginSchema>
export type UserPathParams = z.infer<typeof userPathParams>