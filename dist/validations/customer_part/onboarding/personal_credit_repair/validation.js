import { z } from 'zod';
export class Validation {
    static signUp = {
        body: z
            .object({
            firstName: z.string(),
            lastName: z.string(),
            gender: z.enum(['male', 'female', 'other']),
            dob: z.string(),
            cityName: z.string(),
            state: z.string(),
            zipCode: z.string(),
            ssn: z.string(),
            email: z.string(),
            phone: z.string(),
            password: z.string(),
            cnfPassword: z.string(),
        })
            .strict()
            .refine((data) => data.password === data.cnfPassword, {
            message: "Passwords don't match",
            path: ['cnfPassword'],
        }),
    };
    static bureauCredential = {
        body: z.object({
            bureauName: z.enum(['identifyIQ', 'smartCredit']),
            userName: z.string(),
            password: z.string(),
            phoneNumber: z.string(),
            securityWord: z.string().optional(),
        }),
    };
    static buyPackage = z.object({
        body: z.object({
            packageId: z.custom(),
        }),
    });
}
