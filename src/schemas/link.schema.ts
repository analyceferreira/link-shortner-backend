import { z } from 'zod';


export const linkSchema = z.object({
    url: z.string().url('Informe uma URL válida').min(1, 'URL é obrigatória'),
    short_name: z.string().min(3, 'Short name must contain at least 3 characters').max(100, 'Shortned '),
    userId: z.number(),
});


export const linkPathParams = z.object({
    short_name: z.string()
})


export type LinkSchema = z.infer<typeof linkSchema>
export type LinkPathParams = z.infer<typeof linkPathParams>