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
import { AclGroupController } from './acl.group.controller.js';
import { validateRequest } from 'zod-express-middleware';
import { AclGroupValidation } from './acl.group.validation.js';

export namespace AclGroupRoutes {
  export const index = Router();
  index.post('/acl.group', [
    validateRequest(AclGroupValidation.GroupAdd),
    AclGroupController.GroupAdd,
  ]);
  index.put('/acl.group', [
    validateRequest(AclGroupValidation.GroupEdit),
    AclGroupController.GroupEdit,
  ]);
  index.get('/acl.group', [AclGroupController.GroupList]);
  index.get('/acl.group/:_id', [AclGroupController.GroupView]);
}
