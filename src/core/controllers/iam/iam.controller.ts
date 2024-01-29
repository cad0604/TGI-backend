import { NextFunction, Request, Response } from 'express';
import { IamService } from '../../services/iam/iam.service.js';
import { Acl } from 'acljs';

export namespace IamController {
  export const add = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await IamService.group.add(req));
    } catch (e) {
      next(e);
    }
  };
  export const update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
    } catch (e) {
      next(e);
    }
  };

  export const remove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await IamService.group.remove(req));
    } catch (e) {
      next(e);
    }
  };
  export const list = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(204).json({
        data: req.headers,
      });
    } catch (e) {
      next(e);
    }
  };
}
