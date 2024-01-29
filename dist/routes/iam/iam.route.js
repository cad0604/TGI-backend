import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { IamValidation } from '../../validations/iam/iam.validation.js';
import { IamController } from '../../core/controllers/iam/iam.controller.js';
import { VerifyTokenMiddleware } from '../../core/middlewares/verify_token/verify.token.middleware.js';
export var IamRoutes;
(function (IamRoutes) {
    IamRoutes.group = Router();
    // group.use([VerifyTokenMiddleware.check, GroupCheckGuardMiddleware.check]);
    IamRoutes.group.post('/group/add', [
        validateRequest(IamValidation.group.add),
        IamController.add,
    ]);
    IamRoutes.group.put('/group/update', [
        validateRequest(IamValidation.group.update),
        IamController.update,
    ]);
    IamRoutes.group.delete('/group/remove', [
        validateRequest(IamValidation.group.delete),
        IamController.remove,
    ]);
    IamRoutes.group.get('/group', [IamController.list]);
    IamRoutes.role = Router();
    IamRoutes.role.use(VerifyTokenMiddleware.check);
    IamRoutes.role.post('/role/create', validateRequest(IamValidation.role.create));
    IamRoutes.role.put('/role/update', validateRequest(IamValidation.role.update));
    IamRoutes.role.delete('/role/delete', validateRequest(IamValidation.role.delete));
    IamRoutes.role.get('/role');
})(IamRoutes || (IamRoutes = {}));
