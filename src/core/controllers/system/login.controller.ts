import { Request, Response, NextFunction } from 'express';
import { AuthenticationService } from '../../services/system/authentication.service.js';
export class LoginController {
  static emailPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await AuthenticationService.emailPassword(req));
    } catch (e) {
      next(e);
    }
  };
}
