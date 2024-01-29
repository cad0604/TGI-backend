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

export namespace OneValidation {
  export const SignUp = {
    body: z
      .object({
        firstName: z.string().min(2),
        lastName: z.string().min(2),
        gender: z.enum(['male', 'female', 'other']),
        dob: z.string(),
        cityName: z.string().min(2),
        zipCode: z.string().min(2),
        ssn: z.string().min(2),
        state: z.string().min(2),
        email: z.string().email().min(2),
        phone: z.string().min(2),
        password: z.string().min(2),
        cnfPassword: z.string().min(2),
        // remember: z.boolean(),
        policy: z.boolean(),
      })
      .strict()
      .refine((data) => data.password === data.cnfPassword, {
        message: "Passwords don't match",
        path: ['cnfPassword'],
      }),
  };
  const bureau_credential = {
    body: z.object({}).strict(),
  };
  const plan = {
    body: z.object({}).strict(),
  };
  export const docs = {
    body: z
      .object({
        identityCard1: z.custom<File>(),
        proofOfAddress1: z.custom<File>(),
        socialSecurityCard1: z.custom<File>(),
        identityCard2: z.custom<File>(),
        proofOfAddress2: z.custom<File>(),
        socialSecurityCard2: z.custom<File>(),
      })
      .strict(),
  };
  export const BureauCredential = {
    body: z
      .object({
        provider: z.string().min(2),
        username: z.string().min(2),
        phone: z.string().min(2),
        password: z.string().min(2),
        notes: z.string().min(2).optional(),
      })
      .strict(),
  };
  export const FPAccount = {
    body: z
      .object({
        primaryAccounts: z.array(z.string()),
        freezeAccount: z.array(z.string()),
      })
      .strict(),
  };
}
