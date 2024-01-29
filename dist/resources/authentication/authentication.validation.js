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
export var AuthenticationValidation;
(function (AuthenticationValidation) {
    AuthenticationValidation.SignIn = {
        body: z
            .object({
            email: z.string().email('Enter valid email').min(1, 'Email Required'),
            password: z.string().min(1, 'Password Required'),
            remember: z.boolean().optional(),
        })
            .strict(),
    };
    AuthenticationValidation.ForgotPassword = {
        body: z.object({
            email: z.string().email('Enter valid email').min(1, 'Email Required'),
        }),
    };
})(AuthenticationValidation || (AuthenticationValidation = {}));
