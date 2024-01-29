import { NextFunction, Request, Response } from 'express';
import { SetPasswordService } from '../../services/system/set.password.service.js';

export class SetNewPasswordController {
  static request = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await SetPasswordService.both(req));
    } catch (e) {
      next(e);
    }
  };
}
