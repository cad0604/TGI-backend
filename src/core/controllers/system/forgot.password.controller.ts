import { NextFunction, Request, Response } from 'express';
import { ForgotPasswordService } from '../../services/system/forgot.password.service.js';

export class ForgotPasswordController {
  static request = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const init = await ForgotPasswordService.update(req);
      res.status(200).json(init);
    } catch (e) {
      next(e);
    }
  };
}
