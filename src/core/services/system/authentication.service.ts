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

import { Request } from 'express';
import { JwtUtils } from '../../../utils/security/index.js';
import { Rsa } from '../../../vendor/rsa/rsa.js';
import bcrypt from 'bcrypt';
import { userCredentialsModel } from '../../../database/models/user_info/credentials.model.js';

export class AuthenticationService {
  static emailPassword = async (req: Request) => {
    try {
      const found = await userCredentialsModel.findOne({
        email: req.body.email,
      });
      if (!found) {
        return Promise.reject({
          code: 404,
          success: false,
          message: 'User Not Found',
        });
      } else {
        const isValidPassword = await bcrypt.compare(
          req.body.password,
          found.password,
        );
        if (!isValidPassword) {
          return Promise.reject({
            code: 401,
            success: false,
            message: "Password doesn't match",
          });
        } else {
          try {
            const token = await JwtUtils.generate(
              {
                email: found.email,
              },
              Rsa.privateKey,
            );
            return Promise.resolve({
              token: token,
            });
          } catch (e) {
            return Promise.reject(e);
          }
        }
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
