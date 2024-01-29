import { z } from 'zod';
export class IamValidation {
    static description = z.string().optional();
    static isReservedName = (name) => {
        return ['0', '0'].includes(name.toLowerCase());
    };
    static Name = z.string().refine((value) => !this.isReservedName(value), {
        message: 'Name cannot be admin or administrator',
    });
    static status = z.enum(['0', '1']);
    static id = z.custom();
    static group = {
        add: {
            body: z
                .object({
                groupName: this.Name,
                description: this.description,
            })
                .strict(),
        },
        update: {
            body: z
                .object({
                groupId: this.id,
                groupName: this.Name,
                description: this.description,
                status: this.status,
            })
                .strict(),
        },
        delete: {
            body: z
                .object({
                groupId: this.id,
            })
                .strict(),
        },
    };
    static role = {
        create: {
            body: z
                .object({
                roleName: this.Name,
                roleCode: z.string(),
                description: this.description,
            })
                .strict(),
        },
        update: {
            body: z
                .object({
                roleId: this.id,
                roleName: this.Name,
                description: this.description,
                status: this.status,
            })
                .strict(),
        },
        delete: {
            body: z
                .object({
                roleId: this.id,
            })
                .strict(),
        },
    };
}
