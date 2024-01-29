import { Request } from 'express';
import bcrypt from 'bcrypt';
import {
  passwordSessionModel,
  userCredentialsModel,
} from '../../../database/models/index.js';
import { Template } from '../../../email/templates/template.js';

export class SetPasswordService {
  static both = async (req: Request) => {
    try {
      if (!req.body || typeof req.body !== 'object') {
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Invalid request body',
        });
      }

      const magicToken = req.body.magicToken;
      if (!magicToken) {
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Missing magicToken in request body',
        });
      }

      const passwordSession = await passwordSessionModel.findById(magicToken);

      if (!passwordSession) {
        return Promise.reject({
          code: 400,
          success: false,
          message: 'Invalid or expired magicToken',
        });
      }

      const userId = passwordSession.userId;
      const newPassword = req.body.cnfPassword;

      const sendEmail = await userCredentialsModel.findOne({
        userId: userId,
      });
      console.log(sendEmail?.email);
      if (passwordSession.typeOfSession === 'newUserPassword') {
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        const setUserPassword = await userCredentialsModel.updateOne(
          { userId: userId },
          { $set: { password: hashedPassword } },
        );

        if (setUserPassword) {
          await passwordSessionModel.deleteOne({ _id: magicToken });
          await Template.userPasswordSuccessfully({
            userId: userId,
          });
          return Promise.resolve({
            code: 200,
            success: true,
            message: 'New User password set successfully',
          });
        }
      } else if (passwordSession.typeOfSession === 'newForgotPassword') {
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        await userCredentialsModel.updateOne(
          { userId: userId },
          { $set: { password: hashedPassword } },
        );

        await passwordSessionModel.deleteOne({ _id: magicToken });

        return Promise.resolve({
          code: 200,
          success: true,
          message: 'Password reset successfully',
        });
      } else if (passwordSession.typeOfSession === 'newSetPassword') {
        const hashedPassword = await bcrypt.hash(newPassword, 8);

        await userCredentialsModel.updateOne(
          { userId: userId },
          { $set: { password: hashedPassword } },
        );

        await passwordSessionModel.deleteOne({ _id: magicToken });

        return Promise.resolve({
          code: 200,
          success: true,
          message: 'New Set password successfully',
        });
      } else {
        return Promise.resolve({
          code: 400,
          success: false,
          message: 'Invalid session type',
        });
      }
    } catch (e) {
      return Promise.reject({
        code: 500,
        success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
}
