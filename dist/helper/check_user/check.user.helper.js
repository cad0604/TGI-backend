import { userCredentialsModel, userDetailsModel, } from '../../database/models/index.js';
export class CheckUserHelper {
    static email = async (req) => {
        try {
            const existingEmail = await userCredentialsModel.findOne({
                email: req.body.email,
            });
            return Promise.resolve({
                exist: !!existingEmail,
                data: existingEmail,
            });
        }
        catch (e) {
            return Promise.reject(false);
        }
    };
    static phone = async (req) => {
        try {
            const existingPhone = await userCredentialsModel.findOne({
                phone: req.body.phone,
            });
            return Promise.resolve(!!existingPhone);
        }
        catch (e) {
            return Promise.reject(false);
        }
    };
    static userId = async (userId) => {
        return userCredentialsModel.findOne({
            userId: userId,
        });
    };
    static bothUserDetailsCredentials = async (userId) => {
        try {
            const userInfo = await userDetailsModel.findById(userId);
            const userEmail = await userCredentialsModel.findOne({
                userId: userId,
            });
            return Promise.resolve({
                userInfo: userInfo,
                userEmail: userEmail,
            });
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
}
