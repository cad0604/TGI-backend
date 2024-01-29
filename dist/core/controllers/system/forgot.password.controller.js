import { ForgotPasswordService } from '../../services/system/forgot.password.service.js';
export class ForgotPasswordController {
    static request = async (req, res, next) => {
        try {
            const init = await ForgotPasswordService.update(req);
            res.status(200).json(init);
        }
        catch (e) {
            next(e);
        }
    };
}
