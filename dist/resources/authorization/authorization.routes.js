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
import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { AuthorizationValidation } from './index.js';
export var AuthenticationRoutes;
(function (AuthenticationRoutes) {
    AuthenticationRoutes.index = Router();
    AuthenticationRoutes.index.post('/authorization.verify_refresh_token', [
        validateRequest(AuthorizationValidation.verify_refresh_token),
    ]);
    AuthenticationRoutes.index.post('/authentication.forgot_password', [
        validateRequest(AuthorizationValidation.verify_refresh_token),
    ]);
    AuthenticationRoutes.index.post('/authorization.account_activation');
    AuthenticationRoutes.index.post('/authorization.sign_out');
    AuthenticationRoutes.index.get('/authorization.permissions');
})(AuthenticationRoutes || (AuthenticationRoutes = {}));
