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
import { OneUpload } from '../../../vendor/multer/config.js';
import { validateRequest } from 'zod-express-middleware';
import { OneValidation } from './one.validation.js';
import { OneController } from './one.controller.js';
import { CheckToken } from '../../../helper/check/token/check.token.js';

export namespace OneRoutes {
  export const index = Router();

  index.post(
    '/modules/one.sign_up',
    [validateRequest(OneValidation.SignUp)],
    OneController.SignUp,
  );

  index.use(CheckToken);
  index.post('/modules/one.bureau_credential', [
    validateRequest(OneValidation.BureauCredential),
    OneController.BureauCredential,
  ]);
  index.post('/modules/one.meeting', [OneController.Meeting]);
  index.get('/modules/one.plans', [OneController.Plan]);
  index.post('/modules/one.fp.account', [
    validateRequest(OneValidation.FPAccount),
    OneController.FPAccount,
  ]);
  index.post('/modules/one.docs', [
    OneUpload.fields([
      { name: 'identityCard1', maxCount: 1 },
      { name: 'proofOfAddress1', maxCount: 1 },
      { name: 'socialSecurityCard1', maxCount: 1 },
      { name: 'identityCard2', maxCount: 1 },
      { name: 'proofOfAddress2', maxCount: 1 },
      { name: 'socialSecurityCard2', maxCount: 1 },
    ]),
    validateRequest(OneValidation.docs),
    OneController.Docs,
  ]);
}
