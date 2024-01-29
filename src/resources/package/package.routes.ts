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
import { PackageValidation } from './package.validation.js';
import { PackageController } from './package.controller.js';

export namespace PackageRoutes {
  export const index = Router();

  index.post('/package', [
    validateRequest(PackageValidation.MPackage),
    PackageController.PackageAdd,
  ]);

  index.put('/package/:id', [
    validateRequest(PackageValidation.MPackageUpdate),
    PackageController.PackageUpdate,
  ]);
  index.get('/package', [PackageController.PackageList]);
  index.delete('/package/:id');
  // index.post('/modules/one.docs', [
  //   OneUpload.fields([
  //     { name: 'identityCard', maxCount: 1 },
  //     { name: 'proofOfAddress', maxCount: 1 },
  //     { name: 'socialSecurityCard', maxCount: 1 },
  //   ]),
  //   validateRequest(OneValidation.docs),
  //   OneController.Docs,
  // ]);
}
