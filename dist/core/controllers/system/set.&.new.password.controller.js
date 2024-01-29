import { SetPasswordService } from '../../services/system/set.password.service.js';
export class SetNewPasswordController {
    static request = async (req, res, next) => {
        try {
            res.status(200).json(await SetPasswordService.both(req));
        }
        catch (e) {
            next(e);
        }
    };
}
