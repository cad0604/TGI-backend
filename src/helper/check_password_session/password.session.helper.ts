import { passwordSessionModel } from '../../database/models/index.js';
import { Types } from 'mongoose';

export class PasswordSessionHelper {
  static findID = async (
    userId: Types.ObjectId,
    typeOfSession: 'newUserPassword' | 'newSetPassword' | 'newForgotPassword',
  ) => {
    const passwordSessionExist = await passwordSessionModel.findOne({
      userId: userId,
      typeOfSession: typeOfSession,
    });
    return passwordSessionExist?._id;
  };
  static createPasswordSession = async (
    userId: Types.ObjectId | null | undefined,
    typeOfSession: 'newUserPassword' | 'newSetPassword' | 'newForgotPassword',
  ) => {
    const newSession = new passwordSessionModel({
      userId,
      typeOfSession: typeOfSession,
    });

    return await newSession.save();
  };
}
