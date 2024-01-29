import { z } from 'zod';
export class Validation {
    static login = z.object({
        body: z
            .object({
            email: z.string().email(),
            password: z.string(),
        })
            .strict(),
    });
    static forgotPassword = z.object({
        body: z
            .object({
            email: z.string().email(),
        })
            .strict(),
    });
    static setPassword = {
        body: z
            .object({
            password: z.string(),
            cnfPassword: z.string(),
            magicToken: z.string().regex(/^[0-9a-f]{24}$/),
        })
            .strict()
            .refine((data) => data.password === data.cnfPassword, {
            message: "Passwords don't match",
            path: ['cnfPassword'],
        }),
    };
}
