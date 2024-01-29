/*******************************************************************************
 * Copyright (c) iamsouravganguli 2024.
 * @author Sourav Ganguli <mysganguli@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 ******************************************************************************/
import { NextFunction, Request, Response } from 'express';
import { LeadServiceThree } from './lead.service.js';

export namespace LeadControllerThree {
  export const BusinessDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await LeadServiceThree.BusinessDetails(req));
    } catch (e) {
      next(e);
    }
  };
  export const ApplicantDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await LeadServiceThree.ApplicantDetails(req));
    } catch (e) {
      next(e);
    }
  };
  export const LoanDetails = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await LeadServiceThree.LoanDetails(req));
    } catch (e) {
      next(e);
    }
  };
  export const Documentation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await LeadServiceThree.Documentation(req));
    } catch (e) {
      next(e);
    }
  };
}
