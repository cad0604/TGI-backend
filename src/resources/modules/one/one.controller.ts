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
import { NextFunction, Request, Response } from 'express';
import { OneService } from './one.service.js';

export namespace OneController {
  export const SignUp = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await OneService.SignUp(req));
    } catch (e) {
      next(e);
    }
  };
  export const BureauCredential = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await OneService.BureauCredential(req, res));
    } catch (e) {
      next(e);
    }
  };
  export const Meeting = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await OneService.Meeting(req, res));
    } catch (e) {
      next(e);
    }
  };
  export const Plan = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await OneService.Plan());
    } catch (e) {
      next(e);
    }
  };
  export const Docs = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await OneService.Docs(req, res));
    } catch (e) {
      next(e);
    }
  };
  export const FPAccount = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await OneService.FPAccount(req, res));
    } catch (e) {
      next(e);
    }
  };
}
