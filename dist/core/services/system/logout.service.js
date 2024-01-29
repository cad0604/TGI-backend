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
import { userSessionModel } from '../../../database/models/user_session/user.session.model.js';
import { JwtUtils } from '../../../utils/security/index.js';
import { Rsa } from '../../../vendor/rsa/rsa.js';
import { TokenUtil } from '../../../utils/token/token.util.js';
export class LogoutService {
    static sessionRemove = async (req) => {
        try {
            if (!req.body) {
                return Promise.resolve({
                    code: 404,
                    success: false,
                    message: 'No request body',
                });
            }
            const tokenHeader = req.headers['authorization'];
            const { token } = await TokenUtil.get(tokenHeader);
            const decoded = (await JwtUtils.verify(token, Rsa.publicKey));
            const existingUserSession = await userSessionModel.findOneAndDelete({
                userId: decoded.userId,
            });
            if (existingUserSession) {
                return Promise.resolve({
                    code: 200,
                    success: true,
                    message: 'User logout successful',
                });
            }
            else {
                return Promise.reject({
                    code: 404,
                    success: false,
                    message: 'User session not found',
                });
            }
        }
        catch (e) {
            console.error(e);
            return Promise.reject({
                code: 500,
                success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
}
