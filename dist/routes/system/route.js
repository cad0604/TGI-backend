import { Router } from 'express';
import { ValidationMiddleware } from '../../core/middlewares/validation/validation.middleware.js';
import { Validation } from '../../validations/system/validation.js';
import { LoginController } from '../../core/controllers/system/login.controller.js';
import { ForgotPasswordController } from '../../core/controllers/system/forgot.password.controller.js';
import { VerifyTokenMiddleware } from '../../core/middlewares/verify_token/verify.token.middleware.js';
import { LogoutController } from '../../core/controllers/system/logout.controller.js';
import { MyProfileController } from '../../core/controllers/system/my.profile.controller.js';
import { validateRequest } from 'zod-express-middleware';
import { SetNewPasswordController } from '../../core/controllers/system/set.&.new.password.controller.js';
export class Route {
    static onboardingStatus = Router().get('/onboarding/status');
    static login = Router().post('/login', [
        ValidationMiddleware.request(Validation.login),
        LoginController.emailPassword,
    ]);
    static forgotPassword = Router().post('/forgot-password', [
        ValidationMiddleware.request(Validation.forgotPassword),
        VerifyTokenMiddleware.check,
        ForgotPasswordController.request,
    ]);
    static logout = Router().post('/logout', [
        VerifyTokenMiddleware.check,
        LogoutController.init,
    ]);
    static setPassword = Router().post('/set-password', [
        validateRequest(Validation.setPassword),
        SetNewPasswordController.request,
    ]);
    static profile = Router().get('/profile', [
        VerifyTokenMiddleware.check,
        MyProfileController.request,
    ]);
}
