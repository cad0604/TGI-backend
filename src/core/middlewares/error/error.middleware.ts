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

export class ErrorMiddleware {
  static setup = async (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      if (error) {
        if (error.code === 404) {
          res.status(404).json(error);
        } else if (error.code === 409) {
          res.status(409).json(error);
        } else {
          res.status(400).json(error);
        }
      } else {
        next();
      }
    } catch (e) {
      next(e);
    }
  };
}
