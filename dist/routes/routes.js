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
import { Route } from './system/route.js';
import { IamRoutes } from './iam/iam.route.js';
export class Routes {
    static system = Router().use([
        Route.login,
        Route.forgotPassword,
        Route.logout,
        Route.profile,
        Route.setPassword,
    ]);
    static onboardingStatus = Router().use([Route.onboardingStatus]);
    static iam = Router().use('/iam', [IamRoutes.group, IamRoutes.role]);
}
