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

import { Request } from 'express';
import { UserModel } from '../../database/models/user/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Rsa } from '../../vendor/index.js';
import { SessionModel } from '../../database/models/session/session.model.js';
import { authenticationEvent } from '../../helper/events/authentication/authentication.events.helper.js';

export namespace AuthenticationService {
  export const SignIn = async (req: Request) => {
    try {
      const checkUser = await UserModel.CredentialModel.findOne({
        email: req?.body?.email,
      });
      console.log(checkUser);
      if (checkUser) {
        const isPasswordValid = bcrypt.compare(
          req?.body?.password,
          checkUser?.password as string,
        );

        if (await isPasswordValid) {
          const accessToken = jwt.sign(
            {
              _id: checkUser?._id,
              role: checkUser?.role,
              group: checkUser?.group,
              permission_id: checkUser?.permission_id,
            },
            Rsa.privateKey,
            {
              algorithm: 'RS256',
              expiresIn: '30d',
              issuer: 'Sourav Ganguli',
            },
          );

          const refreshToken = jwt.sign({}, Rsa.privateKey, {
            algorithm: 'RS256',
            expiresIn: '30d',
            issuer: 'Sourav Ganguli',
          });
          authenticationEvent.emit('signinsession', checkUser._id);
          if (checkUser.group === 'PCR' && checkUser.role === 'PCR:Customer') {
            return Promise.resolve({
              code: 200,
              Success: true,
              message: 'Sign in successfully',
              urlPath: '/dashboard/pcr',
              accessToken,
              refreshToken,
            });
          }
          if (checkUser.group === 'PCR' && checkUser.role === 'PCR:Team') {
            return Promise.resolve({
              code: 200,
              Success: true,
              message: 'Sign in successfully',
              urlPath: '/dashboard/team/pcr',
              accessToken,
              refreshToken,
            });
          }
        } else {
          return Promise.reject({
            code: 403,
            Success: false,
            path: 'password',
            message: 'Invalid password',
          });
        }
      } else {
        return Promise.reject({
          code: 404,
          Success: false,
          path: 'email',
          message: 'User not found',
        });
      }
    } catch (e) {
      console.log(e);
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
  export const ForgotPassword = async (req: Request) => {
    try {
      const checkUser = await UserModel.CredentialModel.findOne({
        email: req?.body?.email,
      });

      if (checkUser) {
        const checkSession = await SessionModel.ForgotPassword.findOne({
          user_id: checkUser?._id,
        });
        if (checkSession) {
          authenticationEvent.emit('forgotpassword', {
            userId: checkUser?._id,
            email: checkUser?.email,
            sessionLink: checkSession?._id as string,
          });

          return Promise.resolve({
            code: 200,
            Success: true,
            message: 'Reset password link is sent successfully ',
            path: '/authentication/sign-in',
          });
        } else {
          const newSessionForgotPassword = new SessionModel.ForgotPassword({
            user_id: checkUser?._id,
          });

          const saveSession = await newSessionForgotPassword.save();
          authenticationEvent.emit('forgotpassword', {
            userId: checkUser?._id,
            email: checkUser?.email,
            sessionLink: saveSession?._id as string,
          });
          return Promise.resolve({
            code: 201,
            Success: true,
            message: 'Reset password link is sent successfully ',
            urlPath: '/authentication/sign-in',
          });
        }
      } else {
        return Promise.reject({
          code: 404,
          Success: false,
          path: 'email',
          message: 'User not registered',
        });
      }
    } catch (e) {
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
}
