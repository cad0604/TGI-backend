/*******************************************************************************
 * Copyright (c) iamsouravganguli 2024.
 * @author Sourav Ganguli <mysganguli@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 ******************************************************************************/
import { Router } from 'express';
import { AclGroupRoutes, AclResourceRoutes, CheckoutRoutes, ClientRoutes, LeadsRoutes, OneRoutes, PackageRoutes, PaymentRoutes, } from '../../resources/index.js';
export var PrivateRoutes;
(function (PrivateRoutes) {
    PrivateRoutes.index = Router();
    PrivateRoutes.index.use([
        AclGroupRoutes.index,
        AclResourceRoutes.index,
        OneRoutes.index,
        PackageRoutes.index,
        CheckoutRoutes.index,
        PaymentRoutes.index,
        ClientRoutes.index,
        LeadsRoutes.index,
    ]);
})(PrivateRoutes || (PrivateRoutes = {}));
