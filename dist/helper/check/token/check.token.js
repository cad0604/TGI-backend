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
import jwt from 'jsonwebtoken';
import { Rsa } from '../../../vendor/index.js';
import { TokenUtil } from '../../../utils/token/token.util.js';
export const CheckToken = async (req, res, next) => {
    try {
        const { token } = await TokenUtil.get(req.headers.authorization);
        const token2 = req.cookies?.['accessToken'];
        console.log(req.path);
        jwt.verify(token || token2, Rsa.publicKey, (error, decoded) => {
            if (error) {
                return res.status(401).json({
                    code: 401,
                    Success: false,
                    message: 'Unauthorized: Invalid token',
                });
            }
            else {
                res.locals.decode = decoded;
                next();
            }
        });
    }
    catch (e) {
        return next(e);
    }
};
