import { CheckUserHelper } from '../../../helper/check_user/check.user.helper.js';
import { PasswordSessionHelper } from '../../../helper/check_password_session/password.session.helper.js';
import { Template } from '../../../email/templates/template.js';
export class ForgotPasswordService {
    static update = async (req) => {
        try {
            if (!req.body) {
                return Promise.reject({
                    code: 404,
                    success: false,
                    message: 'No request body',
                });
            }
            const emailExist = await CheckUserHelper.email(req);
            if (!emailExist.exist) {
                return Promise.reject({
                    code: 404,
                    success: false,
                    message: 'User Not Found',
                });
            }
            const passwordSessionId = await PasswordSessionHelper.findID(emailExist?.data?.userId, 'newForgotPassword');
            if (!passwordSessionId) {
                await PasswordSessionHelper.createPasswordSession(emailExist?.data?.userId, 'newForgotPassword');
                return Promise.resolve({
                    code: 200,
                    success: true,
                    message: 'Reset link sent to email',
                });
            }
            const sentEmail = await Template.forgotPassword({
                to: 'mysganguli@gmail.com',
                passwordSessionURL: `http://localhost:3000/new-password/${passwordSessionId}`,
            });
            if (!sentEmail) {
                return Promise.reject({
                    code: 500,
                    success: false,
                    message: 'Error sending reset link email',
                });
            }
            return Promise.resolve({
                code: 200,
                success: true,
                message: 'Reset link sent to email',
            });
        }
        catch (e) {
            return Promise.reject({
                code: 500,
                success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
}
