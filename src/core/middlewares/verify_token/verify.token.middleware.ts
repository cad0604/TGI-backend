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
import { JwtUtils } from '../../../utils/security/index.js';
import { Rsa } from '../../../vendor/rsa/rsa.js';
import { CheckUserHelper } from '../../../helper/check_user/check.user.helper.js';
import { JwtPayload } from 'jsonwebtoken';
import { TokenUtil } from '../../../utils/token/token.util.js';
import { userSessionModel } from '../../../database/models/user_session/user.session.model.js';

export class VerifyTokenMiddleware {
  static check = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenHeader = req.headers['authorization'] as string;
      const { bearer, token } = await TokenUtil.get(tokenHeader);

      if (!tokenHeader) {
        res.status(401).json({
          code: 401,
          success: false,
          message: 'Unauthorized - Missing Bearer Token',
        });
      }

      if (!bearer || !token) {
        res.status(401).json({
          code: 401,
          success: false,
          message: 'Unauthorized - Invalid Bearer Token Format',
        });
      }

      try {
        const decoded = (await JwtUtils.verify(
          token as string,
          Rsa.publicKey,
        )) as JwtPayload;

        const userExists = await CheckUserHelper.userId(decoded.userId);

        if (userExists) {
          const existingUserSession = await userSessionModel.findOne({
            userId: decoded.userId,
          });

          if (existingUserSession) {
            res.locals.user = userExists;
            next();
          } else {
            res.status(401).json({
              code: 401,
              success: false,
              message: 'Unauthorized - Inactive User Session',
            });
          }
        } else {
          res.status(401).json({
            code: 401,
            success: false,
            message: 'Unauthorized - User not found',
          });
        }
      } catch (err) {
        res.status(401).json({
          code: 401,
          success: false,
          message: 'Unauthorized - Invalid Token',
        });
      }
    } catch (e) {
      next(e);
    }
  };
}
