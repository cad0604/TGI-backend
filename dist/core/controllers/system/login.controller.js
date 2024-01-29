import { AuthenticationService } from '../../services/system/authentication.service.js';
export class LoginController {
    static emailPassword = async (req, res, next) => {
        try {
            res.status(200).json(await AuthenticationService.emailPassword(req));
        }
        catch (e) {
            next(e);
        }
    };
}
