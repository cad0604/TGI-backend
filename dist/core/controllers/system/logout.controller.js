import { LogoutService } from '../../services/system/logout.service.js';
export class LogoutController {
    static init = async (req, res, next) => {
        try {
            res.status(200).json(await LogoutService.sessionRemove(req));
        }
        catch (e) {
            next(e);
        }
    };
}
