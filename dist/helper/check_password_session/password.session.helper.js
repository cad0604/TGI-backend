import { passwordSessionModel } from '../../database/models/index.js';
export class PasswordSessionHelper {
    static findID = async (userId, typeOfSession) => {
        const passwordSessionExist = await passwordSessionModel.findOne({
            userId: userId,
            typeOfSession: typeOfSession,
        });
        return passwordSessionExist?._id;
    };
    static createPasswordSession = async (userId, typeOfSession) => {
        const newSession = new passwordSessionModel({
            userId,
            typeOfSession: typeOfSession,
        });
        return await newSession.save();
    };
}
