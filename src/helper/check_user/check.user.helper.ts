import { Request } from 'express';
import {
  userCredentialsModel,
  userDetailsModel,
} from '../../database/models/index.js';
import { Types } from 'mongoose';

export class CheckUserHelper {
  static email = async (req: Request) => {
    try {
      const existingEmail = await userCredentialsModel.findOne({
        email: req.body.email,
      });
      return Promise.resolve({
        exist: !!existingEmail,
        data: existingEmail,
      });
    } catch (e) {
      return Promise.reject(false);
    }
  };
  static phone = async (req: Request) => {
    try {
      const existingPhone = await userCredentialsModel.findOne({
        phone: req.body.phone,
      });
      return Promise.resolve(!!existingPhone);
    } catch (e) {
      return Promise.reject(false);
    }
  };
  static userId = async (userId: Types.ObjectId) => {
    return userCredentialsModel.findOne({
      userId: userId,
    });
  };
  static bothUserDetailsCredentials = async (
    userId?: Types.ObjectId | null | undefined,
  ) => {
    try {
      const userInfo = await userDetailsModel.findById(userId);

      const userEmail = await userCredentialsModel.findOne({
        userId: userId,
      });

      return Promise.resolve({
        userInfo: userInfo,
        userEmail: userEmail,
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
