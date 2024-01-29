import mongoose, { InferSchemaType, Schema } from 'mongoose';

const PasswordSessionModel = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user_details',
    },
    typeOfSession: {
      type: String,
      enum: ['newUserPassword', 'newSetPassword', 'newForgotPassword'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const passwordSessionModel = mongoose.model<
  InferSchemaType<typeof PasswordSessionModel>
>('password_session', PasswordSessionModel);
