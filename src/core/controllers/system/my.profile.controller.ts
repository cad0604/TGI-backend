import { NextFunction, Request, Response } from 'express';
import { ProfileService } from '../../services/system/profile.service.js';

export class MyProfileController {
  static request = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(200).json(await ProfileService.getProfile(req));
    } catch (e) {
      next(e);
    }
  };
}
