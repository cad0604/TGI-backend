/*******************************************************************************
 * Copyright (c) iamsouravganguli 2023.
 * @author Sourav Ganguli <mysganguli@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 ******************************************************************************/
import { z } from 'zod';
export var PackageValidation;
(function (PackageValidation) {
    const bulletPointSchema = z
        .object({
        value: z.string().toLowerCase(),
        highlight: z.boolean().default(false),
    })
        .optional();
    const pricingSchema = z.object({
        fullPrice: z.number().min(1),
        emiPrice: z.number().min(0).optional(),
        intervalType: z
            .enum(['day', 'month', 'week', 'year'])
            .default('month')
            .optional(),
        intervalCount: z.number().optional(),
    });
    const pricingSchemaUpdate = z.object({
        fullPrice: z.number().min(1).optional(),
        emiPrice: z.number().min(0).optional(),
        intervalType: z
            .enum(['day', 'month', 'week', 'year'])
            .default('month')
            .optional(),
        intervalCount: z.number().optional(),
    });
    PackageValidation.MPackage = {
        body: z
            .object({
            name: z.string().toLowerCase(),
            marketingTag: z.string().toLowerCase().optional(),
            module: z.string(),
            stripe: z.object({
                productId: z.string(),
                fullPriceId: z.string(),
                emiPriceId: z.string(),
            }),
            position: z.number().optional(),
            pricing: pricingSchema,
            bulletPoints: z.array(bulletPointSchema),
            status: z.enum(['0', '1', '2']).default('0').optional(),
        })
            .strict(),
    };
    PackageValidation.MPackageUpdate = {
        body: z
            .object({
            name: z.string().toLowerCase().optional(),
            marketingTag: z.string().toLowerCase().optional(),
            module: z.string().optional(),
            stripe: z
                .object({
                productId: z.string().optional(),
                fullPriceId: z.string().optional(),
                emiPriceId: z.string().optional(),
            })
                .optional(),
            position: z.number().optional(),
            pricing: pricingSchemaUpdate.optional(),
            bulletPoints: z.array(bulletPointSchema).optional(),
            status: z.enum(['0', '1', '2']).default('0').optional(),
        })
            .strict()
            .optional(),
    };
})(PackageValidation || (PackageValidation = {}));
