import { NextFunction, Request, Response } from 'express';
import { LogoutService } from '../../services/system/logout.service.js';

export class LogoutController {
  static init = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await LogoutService.sessionRemove(req));
    } catch (e) {
      next(e);
    }
  };
}
