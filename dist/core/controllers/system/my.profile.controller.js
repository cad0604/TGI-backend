import { ProfileService } from '../../services/system/profile.service.js';
export class MyProfileController {
    static request = async (req, res, next) => {
        try {
            res.status(200).json(await ProfileService.getProfile(req));
        }
        catch (e) {
            next(e);
        }
    };
}
