import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { IamValidation } from '../../validations/iam/iam.validation.js';
import { IamController } from '../../core/controllers/iam/iam.controller.js';
import { VerifyTokenMiddleware } from '../../core/middlewares/verify_token/verify.token.middleware.js';
import { GroupCheckGuardMiddleware } from '../../core/middlewares/guard/group.check.guard.middleware.js';

export namespace IamRoutes {
  export const group = Router();
  // group.use([VerifyTokenMiddleware.check, GroupCheckGuardMiddleware.check]);
  group.post('/group/add', [
    validateRequest(IamValidation.group.add),
    IamController.add,
  ]);
  group.put('/group/update', [
    validateRequest(IamValidation.group.update),
    IamController.update,
  ]);
  group.delete('/group/remove', [
    validateRequest(IamValidation.group.delete),
    IamController.remove,
  ]);
  group.get('/group', [IamController.list]);

  export const role = Router();
  role.use(VerifyTokenMiddleware.check);
  role.post('/role/create', validateRequest(IamValidation.role.create));
  role.put('/role/update', validateRequest(IamValidation.role.update));
  role.delete('/role/delete', validateRequest(IamValidation.role.delete));
  role.get('/role');
}
